Eitherway Track — Technical Strategy
This document outlines the technical adjustments for the Beam project to align with the Eitherway Track requirements of the Frontier Hackathon.

Partner Track: Solflare (Deep Integration)
The hackathon prioritizes dApps where the wallet is the core interface layer. We will position Beam as a "Wallet-first payment layer."

Custom Transaction Logic: Building optimized transaction instructions for SOL and USDC transfers.
Deep Linking: Implementing Solflare deep links to ensure the P2P handshake transitions seamlessly into the wallet signing flow.
Transaction Simulation: Using simulation to show users exactly what is leaving their wallet before they tap "Send."
In-app Browser Support: Optimizing UI specifically for the Solflare mobile browser for best proximity pairing performance.
Secondary Integration: Quicknode
To maximize performance and "Integration Depth" scores:

Real-time Transactions: Leveraging Quicknode RPC for high-speed balance lookups and transaction history.
Live Notifications: Utilizing Quicknode Webhooks to trigger "Payment Received" alerts as soon as the block is confirmed.
Submission Deliverables
Live Production URL: Production-ready and accessible dApp.
Integration Documentation: Detailed documentation explaining the implementation of Solflare deep links and Quicknode infrastructure.
Demo Video: A 2-3 minute showcase of the "Bring phones close -> Recognize -> Pay -> Confirmed" flow.
Next Steps:

Initiate Proximity Pairing (WebRTC) development.
Configure Quicknode RPC endpoints.
Develop Solflare Deep Link handlers.