import { createMultisig } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const myKeypair = getKeypairFromEnvironment("SECRET_KEY");
const myFriendsPk = getKeypairFromEnvironment("SECRET_KEY2");

console.log(
    `✅ Finished! We've loaded our keypairs securely, using an env file! Our public keys is: ${myKeypair.publicKey.toBase58()} and ${myFriendsPk.publicKey.toBase58()}`
  );

  const connection = new Connection(clusterApiUrl("devnet"));

  const multisigKey = await createMultisig(
    connection,
    myKeypair,
    [
    myKeypair.publicKey,
    myFriendsPk.publicKey,
    ],
    2
  );
  
  console.log(`Created 2/2 multisig ${multisigKey.toBase58()}`);
