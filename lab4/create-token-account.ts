import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);
// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
    "EtuViV3MbUBz5CGVaeBQMCA2CQjqUM69oFz3mgzmi4Ms"
  );
  
  // Subtitute in a recipient from addresses.ts
  const recipient = new PublicKey("GYx2xVBngWn7HRjxTzPnAsJ4ivMbV3RWiB5DfE9peHsj");
  
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
  );
  
  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
  
  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
  );
  
  console.log(`✅ Created token Account: ${link}`);
  