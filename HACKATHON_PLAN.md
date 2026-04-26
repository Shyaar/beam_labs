# BEAM: Frontier Hackathon Execution Plan (1 Week)

Project: **BEAM** — Proximity-based Solana Wallet experience.
Primary Partner integration: **Solflare** (Wallet-First Track).

## 1. The Smart Contract (Anchor Program)
You are correct that the actual **sending** of SOL/Tokens is handled by the Solana System/Token programs via SDKs. However, to build a "production-ready" dApp with "Deep Integration," the contract should handle:

- **Identity Registry**: Mapping PublicKeys to human-readable usernames and avatars (so users see "Abhishek" nearby, not `8j3k...`).
- **Beam Requests**: An on-chain state for "Proximity Requests." A user "beams" a request to a neighbor. The neighbor approves. This allows for **Transaction Simulation** (Solflare feature) to show exactly what is being requested.
- **Trust Score / Social Graph**: (Optional) On-chain tracking of frequent "Beams" to build a proximity-based reputation.

## 2. Solflare Deep Integration
To win the Solflare track ($3,000), we must go beyond the "Connect" button:
- **Transaction Simulation**: Before a user confirms a "Beam," we will use the SDK to show a simulated result of the transaction.
- **Deep Linking**: Using `solflare://` links to trigger the wallet for signing if the user is in the mobile app.
- **In-App Browser Optimization**: Ensuring the UI is "Premium" and fits the Solflare mobile browser perfectly.
- **Wallet-First Onboarding**: Fetching user info or using metadata from the wallet to pre-fill the BEAM profile.

---

## 3. Seven-Day Sprint Schedule

### Day 1: Anchor Foundations & Identity
- **Goal**: Implement the `beam_identity` program.
- **Tasks**:
  - Define `UserAccount` pda (username, avatar, pubkey).
  - Create `register` and `update_profile` instructions.
  - Deploy to Devnet.
  - Generate TypeScript IDL and Client.

### Day 2: Deep Wallet Integration (Mobile-First)
- **Goal**: Perfect the connection flow.
- **Tasks**:
  - Implement full Mobile Wallet Adapter (MWA) for Native.
  - Implement Solflare-specific adapters for Web.
  - Set up "Wallet Standard" discovery.
  - Test connection persistence across app restarts.

### Day 3: Proximity Simulator & UX
- **Goal**: Build the "Nearby" discovery interface.
- **Tasks**:
  - Create the "Scanning for Neighbors" animation (Premium Aesthetics).
  - Build a mock "Discovery Engine" (simulating finding other BEAM users via Bluetooth/location).
  - Link the "Nearby" card to the `UserAccount` state on-chain.

### Day 4: The "Beam" Transaction Flow
- **Goal**: Build the core payment request & send logic.
- **Tasks**:
  - Implement the "Beam Request" (On-chain vs Off-chain hybrid).
  - Integrate **Solflare Transaction Simulation** to show "Sending 5 SOL to @abhishek" UI.
  - Implement the "Success" beam animation (Exploding green gradients).

### Day 5: Dashboard & Analytics (Birdeye/Quicknode Lite)
- **Goal**: Visualize user activity.
- **Tasks**:
  - Build the "Transaction History" view using Quicknode/Helius RPC.
  - Integrate Birdeye APIs for price feeds (showing USD value of beams in real-time).
  - Implement "Portfolio Analytics" showing total bemed/received.

### Day 6: Polish & Performance
- **Goal**: Optimization for Solflare Browser.
- **Tasks**:
  - Handle edge cases: No wallet found, transaction rejected, insufficient funds.
  - Finalize CSS/Animations (ensure 60FPS on mobile).
  - Run `npm run build` and verify production bundle size.

### Day 7: Submission & Demo
- **Goal**: Finalize Hackathon entries.
- **Tasks**:
  - Record the 2-minute demo video (showing mobile device Beam experience).
  - Deploy to Mainnet (Small test transactions).
  - Write `INTEGRATION.md` explaining the Solflare deep integration.
  - Submit on Superteam Earn.

---

## 4. Immediate Next Steps (Day 1)
1. Initialize the Anchor project in the root.
2. Define the `Profile` account structure.
3. Hook up the Frontend `OnboardingFlow` to call the `register` instruction.
