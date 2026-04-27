BEAM
Proximity-Based Crypto Payments on Solana
Product Specification Document
Frontier Hackathon — Superteam Earn  |  April 2026  |  v1.0

Product Name	Beam

Tagline	AirDrop for crypto. Bring phones close. Money moves.

Hackathon Track	Solflare (Primary) — Frontier Hackathon

Blockchain	Solana Mainnet

Target Users	Crypto-native individuals, event attendees, market vendors

Status	MVP — Hackathon Submission

1. Executive Summary
Beam is a proximity-based crypto payment application built on Solana that eliminates the friction of sharing wallet addresses or scanning QR codes. Inspired by Apple AirDrop, Beam allows two users to simply bring their phones close together to initiate a payment — no address exchange, no scanning, no copy-pasting.

The application targets two primary scenarios: peer-to-peer transfers between friends, and vendor-to-customer payments at events such as developer conferences, crypto hackathons, and public markets. By making Solana payments feel as natural as tapping a card, Beam aims to bring crypto payments closer to mainstream usability.

2. Problem Statement
2.1 The Current Pain
Sending crypto to someone standing next to you is surprisingly difficult. The standard flow requires one party to open their wallet, locate their receive address, copy or display a QR code, and wait for the other party to scan or paste it. At a busy conference, a loud venue, or across a market stall, this process is awkward and error-prone.

Existing alternatives are not much better:
    • QR codes require good lighting and steady hands
    • Copy-paste addresses are long, error-prone, and require switching apps
    • ENS/SNS names still require manual input
    • NFC-based solutions are largely limited to native apps and Apple restrictions

2.2 Target Scenarios
Scenario	Description
Friend-to-Friend	Two crypto users at the same location want to split a bill, repay a debt, or send funds without exchanging wallet details.
Event Vendors	A vendor at Devcon, Breakpoint, or a crypto-native market wants to accept payments without a traditional PoS terminal.
Hackathon Prizes	Organizers distributing small prize pools or bounties to multiple attendees simultaneously.
Group Splits	A group wanting to settle shared expenses on-the-spot in USDC or SOL.

3. Product Vision & Goals
3.1 Vision Statement
To make sending crypto as effortless and intuitive as bumping phones — the fastest, most human way to move money on Solana.

3.2 Success Metrics
Metric	Target (Post-Hackathon)
Time-to-send	< 10 seconds from open to confirmed transaction
Onboarding time	< 60 seconds for first-time user
Active sessions at a single event	50+ unique wallet pairs
Transaction success rate	> 95% on first attempt
Retention	Users return at next event without re-onboarding

4. User Personas

Persona 1 — The Conference Attendee
    • Name: Alex, developer attending Breakpoint 2026
    • Crypto literacy: High — uses Phantom/Solflare daily
    • Pain point: Splitting conference dinner with 5 others using crypto is painful
    • Goal: Pay and receive SOL/USDC from nearby friends instantly
    • Device: Android or iPhone, always has mobile browser open

Persona 2 — The Crypto Vendor
    • Name: Maria, selling merch at a crypto conference pop-up
    • Crypto literacy: Medium — comfortable with wallets, not with dev tools
    • Pain point: Customers want to pay in crypto but QR codes slow down the queue
    • Goal: Open Beam in merchant mode and tap-to-receive from each customer
    • Device: Android tablet or phone mounted at the stall

Persona 3 — The Casual Sender
    • Name: Jordan, first time using crypto payments at an event
    • Crypto literacy: Low-Medium — has a wallet but rarely transacts
    • Pain point: Afraid of sending to the wrong address
    • Goal: A foolproof, address-free way to pay a friend nearby
    • Device: iPhone, using in-app browser via Solflare

5. Core Features
5.1 Proximity Pairing (P2P Mode)
The signature feature of Beam. Two users open the app and enter pairing mode. Using WebRTC peer discovery combined with a short broadcast signal, the app detects nearby devices on the same network or local broadcast domain. Users see a list of nearby Beam users and tap to initiate.

    • First-time pair: wallet addresses are exchanged automatically in the background via WebRTC data channel
    • Subsequent pairs: the app recognises the device and wallet, skipping re-pairing
    • No manual address input required at any point
    • Pairing completes in under 3 seconds on a typical conference WiFi network

5.2 Send Flow
Once paired, the sender enters an amount and selects the token (SOL or USDC). A single confirmation tap triggers the Solflare deep link, which opens the wallet signing screen. After signing, the transaction is broadcast to Solana mainnet and the receiver sees a confirmation notification.

    • Supports SOL and USDC (SPL token)
    • Amount input supports both token denomination and fiat equivalent (USD)
    • Transaction preview shows estimated fee before signing
    • Confirmation screen shows transaction signature and explorer link

5.3 Merchant / Tap-to-Pay Mode
Vendors open Beam in Merchant Mode, which displays a persistent receive interface. The vendor sets an optional item name and amount. Customers tap Beam on their phone, see the payment request, and approve in one tap. Designed for high-throughput use at busy market stalls or conference booths.

    • Merchant sets amount and optional label (e.g. 'T-Shirt — 5 USDC')
    • Customer phone auto-detects merchant via proximity broadcast
    • One-tap approval on customer side
    • Merchant sees live transaction feed of incoming payments
    • Works on tablet or phone in landscape mode for counter display

5.4 Contact Memory
After a successful first transaction, Beam saves the counterparty's wallet address locally with a display name derived from their Solana Name Service (SNS) record or a user-set nickname. Future payments to the same person skip the pairing step entirely.

    • Saved contacts stored in browser localStorage
    • SNS name lookup via Solana Name Service
    • Manual nickname override supported
    • Contact list shows last transaction date and amount

5.5 Transaction History
A clean, chronological view of all sends and receives. Each entry shows counterparty name/address, amount, token, timestamp, and a link to Solana Explorer. Powered by Quicknode RPC for fast historical data retrieval.

6. User Flows
6.1 First-Time P2P Send Flow
Step	Action
1	User A opens Beam in mobile browser and connects Solflare wallet
2	User A taps 'Send Nearby' — app enters proximity broadcast mode
3	User B opens Beam and taps 'Receive' — app begins listening
4	App detects User B's device within ~10 metres via WebRTC/local broadcast
5	User A selects User B from nearby list — wallet addresses exchange silently
6	User A enters amount (e.g. 5 USDC) and taps 'Send'
7	Solflare deep link opens — User A reviews and signs transaction
8	Transaction confirmed on Solana — User B sees success notification
9	Both users' contact lists updated with each other's details

6.2 Merchant Receive Flow
Step	Action
1	Merchant opens Beam, connects wallet, switches to Merchant Mode
2	Merchant sets item name and price (optional) — broadcast begins
3	Customer walks up, opens Beam on phone
4	Customer's app detects merchant broadcast instantly
5	Customer sees payment request with item name and amount
6	Customer taps 'Pay' — Solflare opens for signing
7	Signed — merchant sees payment confirmation in live feed

7. Out of Scope (v1.0)
The following features are explicitly excluded from the hackathon MVP to maintain focus and delivery quality:

    • Native iOS or Android application
    • True NFC hardware integration (deferred due to iOS restrictions)
    • Multi-token support beyond SOL and USDC
    • Multi-signature or threshold payment flows
    • Fiat on/off ramp integration
    • DAO or group treasury management
    • Backend database or user accounts — all state is client-side

8. Hackathon Track Alignment
Judging Criterion	How Beam Addresses It
Real-world utility (30%)	Solves a universal pain point for any crypto user at any event. Immediately usable at Devcon, Breakpoint, and similar gatherings.
Product quality (30%)	Mobile-first UX, sub-10s payment flow, clear error handling, offline-friendly pairing fallback, production-deployed on Solana mainnet.
Integration depth (25%)	Solflare is the core signing and wallet layer — not a connect button. Deep links, in-app browser, and transaction simulation all utilised.
Adoption potential (15%)	Event-driven distribution strategy. Natural network effects: if one vendor uses it, attendees download it. Stays live post-hackathon.

9. Post-Hackathon Roadmap
Phase	Features
Phase 1 — MVP (Hackathon)	P2P proximity send, Merchant mode, Solflare integration, SOL + USDC, Transaction history
Phase 2 — Growth	SNS name support, Saved contacts, Multi-token, Push notifications via Quicknode webhooks
Phase 3 — Scale	Native mobile app, True NFC (Android), Kamino yield on idle merchant balances, DFlow routing for best-price token swaps
Phase 4 — Ecosystem	Event organizer SDK, Hackathon prize distribution tool, White-label merchant terminal


Beam — Frontier Hackathon 2026  |  Built on Solana  |  Solflare Track