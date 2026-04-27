import * as anchor from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from './beam.json';

export const PROGRAM_ID = new PublicKey("7ZrYLveeTZt1yFBzP1Q1Wp7KNoLoPqM5nqMLejgJF88t");

export { idl };

export function getBeamProgram(connection: Connection, wallet: any) {
  const provider = new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment: 'processed',
  });
  return new anchor.Program(idl as anchor.Idl, provider);
}

export const getUserAccountPDA = (owner: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("user"), owner.toBuffer()],
    PROGRAM_ID
  );
};
