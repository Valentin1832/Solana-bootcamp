import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 9);

const myKeypair = getKeypairFromEnvironment("SECRET_KEY");
const myFriendsPk = getKeypairFromEnvironment("SECRET_KEY2");
// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "5gN3T1rQ8U9FUusJAxoMGyWgcvXRXqfvFz1P4VzJFBTR"
);
// Subtitute in a recipient token account you just made
const recipientAssociatedTokenAccount = new PublicKey(
    "9ATUfTmtqHMwkQ3eWgDHHeZLbv7TpR2q48xFDeEuGWL7"
  );
  
  const multisigKey = new PublicKey("C3rg2WkMtbHo6NfbPLJaoTDr5LpuZrdbm4Gvs6kviNBm");

  const transactionSignature = await mintTo(
    connection,
    myKeypair,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    multisigKey,
    10 * MINOR_UNITS_PER_MAJOR_UNITS,
    [
        myKeypair,
        myFriendsPk
      ]
  );
  
  const link = getExplorerLink("transaction", transactionSignature, "devnet");
  
  console.log(`✅ Success! Mint Token Transaction: ${link}`);