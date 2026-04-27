const anchor = require("@coral-xyz/anchor");
const { assert } = require("chai");

describe("beam", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.beam;
  const provider = anchor.getProvider();

  it("Registers a user profile", async () => {
    const [userAccountPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("user"), provider.publicKey.toBuffer()],
      program.programId
    );

    const username = "abhishek";
    const avatarUrl = "https://example.com/avatar.png";

    await program.methods
      .register(username, avatarUrl)
      .accounts({
        userAccount: userAccountPDA,
        owner: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const account = await program.account.userAccount.fetch(userAccountPDA);
    assert.equal(account.username, username);
    assert.equal(account.avatarUrl, avatarUrl);
    assert.equal(account.owner.toBase58(), provider.wallet.publicKey.toBase58());
  });

  it("Updates a user profile", async () => {
    const [userAccountPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("user"), provider.publicKey.toBuffer()],
      program.programId
    );

    const newUsername = "abhishek_web3";
    
    await program.methods
      .updateProfile(newUsername, null)
      .accounts({
        userAccount: userAccountPDA,
        owner: provider.wallet.publicKey,
      })
      .rpc();

    const account = await program.account.userAccount.fetch(userAccountPDA);
    assert.equal(account.username, newUsername);
  });
});
