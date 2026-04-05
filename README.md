# CHITRAGUPT

Chitragupt is a decentralized censorship proof whistleblower platform. Named after the Hindu deity who maintains the permanent tamper proof record of every soul's actions, this platform ensures that truth cannot be deleted, silenced, or suppressed.

Users can upload sensitive evidence such as documents, images, videos, and audio. The evidence gets encrypted, sharded, and stored permanently on chain. It is automatically released to the public when a dead man switch is triggered. There is no central authority and no single point of failure.

## Core Features

* Anonymous Evidence Submission without login requirements or IP logging
* Client side AES 256 GCM Encryption ensuring data is secured before leaving the device
* Shamir Secret Sharing to split the encryption key into multiple shards distributed to guardian wallets
* Decentralized Storage via IPFS and Arweave for guaranteed permanent persistence
* Dead Man Switch powered by Chainlink Automation which automatically releases shards if check in is missed
* Guardian Network of designated wallets that hold key shards and submit them upon trigger
* On chain Verification using SHA 256 hashing to prove the authenticity of the released evidence
* Public Release Interface providing an uncensorable permanent URL for reconstructed evidence

## Technology Stack

* Frontend built with Next.js 14 App Router and TailwindCSS
* Smart Contracts written in Solidity and deployed via Hardhat to Polygon
* Client side cryptographic operations managed with crypto browserify and shamirs secret sharing
* Storage managed through web3.storage for IPFS and Arweave JS SDK
* Chainlink Automation for trustless time based triggering
* Blockchain interactions powered by ethers.js and WalletConnect

## Terminology

The architecture naturally translates to its Sanskrit equivalents to reflect the thematic depth of the project.

* Vault translates to Lekhaa
* Guardian translates to Yamadoot
* Evidence translates to Saakshya
* Release translates to Prakash
* Dead Man Switch translates to Antim Sanket
* Whistleblower translates to Satyavadi

## Getting Started

First, install the project dependencies.

```bash
npm install
```

To run the smart contract test suite, execute the Hardhat command.

```bash
npx hardhat test
```

To deploy the contracts to the Polygon Amoy testnet, ensure your environment variables are configured correctly and run the deployment script.

```bash
npx hardhat run scripts/deploy.js --network polygonAmoy
```

## Security Posture

* All encryption occurs fully on the client side
* No plaintext data touches the server
* No user accounts or emails are stored
* Guardian addresses serve as the only identity layer
* The architecture provides Tor compatibility out of the box
