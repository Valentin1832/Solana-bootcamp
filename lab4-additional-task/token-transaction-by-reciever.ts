import { clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import { transfer, mintTo } from '@solana/spl-token';
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import "dotenv/config";

(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const fromWallet = getKeypairFromEnvironment("SECRET_KEY");
    const toWallet = getKeypairFromEnvironment("SECRET_KEY2");
    const mint = new PublicKey("7VWAa51T2NC7BBTG28V2xVQGJi4ikxUaNdWVrTbzgwYN");
    const fromTokenAccount = new PublicKey("9ATUfTmtqHMwkQ3eWgDHHeZLbv7TpR2q48xFDeEuGWL7");
    const toTokenAccount = new PublicKey("4kPVqjXKhZrVKCd3jHNHfPbFvfVEQXjRPsazqAdJJH31"); 
    const multisigKey = new PublicKey("D9sRvdE7pxomtHmKj5UxPzVr13TS2vSFt9Qy2qq3NN9P"); 

    console.log(
        `✅ The first pk is sender: ${fromWallet.publicKey.toBase58()} and the second is reciever: ${toWallet.publicKey.toBase58()}`
      );

    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount,
        multisigKey,
        0,
        [
            fromWallet,
            toWallet
          ]
    );
    console.log('mint tx:', signature);


    signature = await transfer(
        connection,
        toWallet,
        fromTokenAccount,
        toTokenAccount,
        fromWallet.publicKey,
        1000000000,
        [fromWallet, toWallet]
    );

    const link = getExplorerLink("transaction", signature, "devnet");
  
    console.log(`✅ Success! Mint Token Transaction: ${link}`);
})();

