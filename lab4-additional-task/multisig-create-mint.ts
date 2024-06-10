import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const myKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${myKeypair.publicKey.toBase58()}`
  );

  const connection = new Connection(clusterApiUrl("devnet"));

  const multisigKey = new PublicKey ("C3rg2WkMtbHo6NfbPLJaoTDr5LpuZrdbm4Gvs6kviNBm");

  const mint = await createMint(
    connection,
    myKeypair,
    multisigKey,
    multisigKey,
    9
  );

  const link = getExplorerLink("address", mint.toString(), "devnet");
  
  console.log(`✅ Token Mint: ${link}`);