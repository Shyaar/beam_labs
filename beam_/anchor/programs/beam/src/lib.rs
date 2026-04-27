use anchor_lang::prelude::*;

declare_id!("7ZrYLveeTZt1yFBzP1Q1Wp7KNoLoPqM5nqMLejgJF88t");

#[program]
pub mod beam {
    use super::*;

    pub fn register(ctx: Context<Register>, username: String, avatar_id: String) -> Result<()> {
        require!(username.len() <= 32, BeamError::UsernameTooLong);
        require!(avatar_id.len() <= 10, BeamError::AvatarIdTooLong);

        let user_account = &mut ctx.accounts.user_account;
        user_account.username = username;
        user_account.avatar_id = avatar_id;
        user_account.owner = *ctx.accounts.owner.key;
        user_account.total_beams_sent = 0;
        user_account.bump = ctx.bumps.user_account;
        
        msg!("User registered: {}", user_account.username);
        Ok(())
    }

    pub fn update_profile(ctx: Context<UpdateProfile>, username: Option<String>, avatar_id: Option<String>) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        
        if let Some(name) = username {
            require!(name.len() <= 32, BeamError::UsernameTooLong);
            user_account.username = name;
        }
        
        if let Some(id) = avatar_id {
            require!(id.len() <= 10, BeamError::AvatarIdTooLong);
            user_account.avatar_id = id;
        }
        
        msg!("Profile updated for: {}", user_account.username);
        Ok(())
    }

    /// The 'Beam' - Sends SOL from one user to another through the BEAM protocol.
    /// This allows us to track 'Total Beams Sent' and emit real-time events.
    pub fn send_beam(ctx: Context<SendBeam>, amount: u64, message: String) -> Result<()> {
        require!(amount > 0, BeamError::InvalidAmount);
        
        // 1. Perform the SOL transfer
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.sender.key(),
            &ctx.accounts.receiver.key(),
            amount,
        );
        
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.sender.to_account_info(),
                ctx.accounts.receiver.to_account_info(),
            ],
        )?;

        // 2. Update stats for the sender
        let sender_account = &mut ctx.accounts.sender_profile;
        sender_account.total_beams_sent += 1;

        // 3. Emit event for the frontend to show the "Exploding Green" success animation
        emit!(BeamEvent {
            from: ctx.accounts.sender.key(),
            to: ctx.accounts.receiver.key(),
            amount,
            message,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Register<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + (4 + 32) + (4 + 10) + 32 + 8 + 1, // discriminator + username + avatar_id + owner + total_beams + bump
        seeds = [b"user", owner.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(
        mut,
        seeds = [b"user", owner.key().as_ref()],
        bump = user_account.bump,
        has_one = owner
    )]
    pub user_account: Account<'info, UserAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct SendBeam<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,
    /// CHECK: Recipient of the SOL beam
    #[account(mut)]
    pub receiver: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [b"user", sender.key().as_ref()],
        bump = sender_profile.bump,
    )]
    pub sender_profile: Account<'info, UserAccount>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserAccount {
    pub username: String,     // 32 chars
    pub avatar_id: String,     // 10 chars (identifier)
    pub owner: Pubkey,         // 32
    pub total_beams_sent: u64, // 8
    pub bump: u8,              // 1
}

#[event]
pub struct BeamEvent {
    pub from: Pubkey,
    pub to: Pubkey,
    pub amount: u64,
    pub message: String,
    pub timestamp: i64,
}

#[error_code]
pub enum BeamError {
    #[msg("Username must be 32 characters or less")]
    UsernameTooLong,
    #[msg("Avatar ID must be 10 characters or less")]
    AvatarIdTooLong,
    #[msg("Amount must be greater than 0")]
    InvalidAmount,
}
