<p align="center">
  <img src="https://img.shields.io/badge/SOLIDITY-0.8.24-363636?style=for-the-badge&logo=solidity&logoColor=white" />
  <img src="https://img.shields.io/badge/NEXT.JS-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/POLYGON-AMOY-7B3FE4?style=for-the-badge&logo=polygon&logoColor=white" />
  <img src="https://img.shields.io/badge/AES--256--GCM-ENCRYPTED-FF6B6B?style=for-the-badge&logo=letsencrypt&logoColor=white" />
  <img src="https://img.shields.io/badge/LICENSE-MIT-FFD93D?style=for-the-badge" />
</p>

<br/>

<h1 align="center">
  <code>चित्रगुप्त</code>
  <br/>
  <strong>CHITRAGUPT</strong>
</h1>

<p align="center">
  <strong>Decentralized · Censorship-Proof · Whistleblower Vault Protocol</strong>
</p>

<p align="center">
  <em>Named after the Hindu deity who maintains the permanent, tamper-proof record of every soul's actions.<br/>Truth cannot be deleted.</em>
</p>

<p align="center">
  <a href="#-quickstart">Quickstart</a> ·
  <a href="#-how-it-works">How It Works</a> ·
  <a href="#-architecture">Architecture</a> ·
  <a href="#-smart-contracts">Smart Contracts</a> ·
  <a href="#-cryptographic-engine">Crypto Engine</a> ·
  <a href="#-development">Development</a> ·
  <a href="#-roadmap">Roadmap</a>
</p>

---

## The Problem

Whistleblowers face an impossible choice: **speak the truth and risk everything**, or stay silent and let corruption persist. Existing platforms suffer from centralized servers that can be seized, DNS that can be hijacked, databases that can be wiped, and identities that can be exposed. A single subpoena, a single raid, a single compromised admin — and evidence disappears forever.

## The Solution

**Chitragupt** is a zero-trust protocol that mathematically eliminates every single point of failure:

- 🔐 **Client-side AES-256-GCM encryption** — plaintext never leaves your browser
- 🔑 **Shamir's Secret Sharing** — the key is shattered into N shards, K required to reconstruct
- ⛓️ **Polygon blockchain** — immutable on-chain state, no admin keys, no pause function
- 🌐 **IPFS + Arweave** — dual persistent storage, censorship-proof by design
- ⏱️ **Dead Man's Switch** — Chainlink Keepers auto-trigger if the whistleblower goes silent
- 👻 **Zero identity** — no accounts, no emails, no IP logging, Tor-compatible

> **If the whistleblower disappears, the evidence appears.**

---

## 🚀 Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)
- A funded wallet on [Polygon Amoy Testnet](https://amoy.polygonscan.com/) (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/zynorex/chitragupt.git
cd chitragupt

# Install smart contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Run the Frontend

```bash
cd frontend
npm run dev
# → http://localhost:3000
```

### Run Smart Contract Tests

```bash
# From root directory
npx hardhat test
```

### Deploy to Polygon Amoy

```bash
# Create .env file in root
echo "PRIVATE_KEY=your_wallet_private_key" > .env
echo "NEXT_PUBLIC_POLYGON_RPC=https://rpc-amoy.polygon.technology" >> .env
echo "ETHERSCAN_API_KEY=your_polygonscan_api_key" >> .env

# Deploy
npx hardhat run scripts/deploy.js --network polygonAmoy

# Verify on PolygonScan
npx hardhat verify --network polygonAmoy <DEPLOYED_ADDRESS>
```

---

## ⚙️ How It Works

```
 ┌─────────────┐     ┌──────────────┐     ┌────────────────┐     ┌───────────────┐
 │  1. SELECT   │ ──▶ │  2. ENCRYPT  │ ──▶ │  3. SHARD KEY  │ ──▶ │  4. STORE ON  │
 │  EVIDENCE    │     │  AES-256-GCM │     │  SHAMIR'S SSS  │     │  IPFS+ARWEAVE │
 └─────────────┘     └──────────────┘     └────────────────┘     └───────────────┘
                                                  │
                                                  ▼
 ┌─────────────┐     ┌──────────────┐     ┌────────────────┐
 │  7. PUBLIC   │ ◀── │  6. COLLECT  │ ◀── │  5. REGISTER   │
 │  RELEASE     │     │  K SHARDS    │     │  ON-CHAIN      │
 └─────────────┘     └──────────────┘     └────────────────┘
```

**Step-by-step:**

1. **Select Evidence** — The whistleblower uploads files (docs, images, video, audio) via the browser
2. **Client-Side Encryption** — `window.crypto.subtle` generates an ephemeral AES-256-GCM key and encrypts the file entirely in-browser. Plaintext never touches any server
3. **Key Fragmentation** — The AES key is split into N polynomial shards using Shamir's Secret Sharing. Any K shards can reconstruct the key, but K-1 shards reveal nothing
4. **Immutable Storage** — The encrypted blob is uploaded to IPFS (via Web3.Storage) and backed up on Arweave's Permaweb for 200+ year persistence
5. **On-Chain Registration** — A `Lekhaa` (vault record) is created on Polygon containing the evidence hash, storage CIDs, guardian addresses, threshold geometry, and check-in interval
6. **Dead Man's Switch** — Chainlink Keepers monitor the check-in timer. If `block.timestamp > lastCheckin + interval`, the switch triggers automatically. Guardians submit their shards on-chain
7. **Public Release** — When K shards are collected, the contract marks the vault as released. Anyone can reconstruct the key, decrypt the evidence, and verify its SHA-256 hash against the on-chain record

---

## 🏗️ Architecture

```
chitragupt/
│
├── contracts/
│   └── Chitragupt.sol              # Core vault smart contract
│
├── scripts/
│   └── deploy.js                   # Hardhat deployment script
│
├── test/
│   └── Chitragupt.test.js          # 13 comprehensive test cases
│
├── frontend/
│   ├── src/
│   │   ├── app/                    # Next.js App Router pages
│   │   │   ├── page.tsx            # Landing page
│   │   │   ├── about/              # Manifesto & mythology
│   │   │   ├── features/           # Technical feature showcase
│   │   │   ├── shabd-kosh/         # Protocol documentation
│   │   │   ├── submit/             # Evidence submission portal
│   │   │   ├── dashboard/          # Whistleblower vault manager
│   │   │   ├── guardian/           # Yamadoot shard operations
│   │   │   ├── verify/             # SHA-256 verification tool
│   │   │   └── cryptotest/         # Crypto engine sandbox
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Floating brutalist navbar
│   │   │   └── Footer.tsx          # Terminal-style footer
│   │   │
│   │   └── lib/crypto/             # Client-side crypto engine
│   │       ├── index.ts            # Orchestrator
│   │       ├── aes.ts              # AES-256-GCM operations
│   │       ├── sss.ts              # Shamir's Secret Sharing
│   │       └── utils.ts            # Buffer utils + memory wipe
│   │
│   └── package.json
│
├── hardhat.config.js               # Polygon Amoy configuration
├── ROADMAP.md                      # 6-phase strategic roadmap
├── DEVELOPMENT.md                  # Comprehensive dev documentation
└── README.md                       # ← You are here
```

---

## 📜 Smart Contracts

### `Chitragupt.sol`

The smart contract is the immutable backbone of the protocol. It stores **no sensitive data** — only hashes, encrypted CIDs, and address mappings.

**Core Data Structure:**

```solidity
struct Lekhaa {
    bytes32 evidenceHash;       // SHA-256 fingerprint of original evidence
    string ipfsCID;             // Encrypted payload location on IPFS
    string arweaveTxId;         // Permanent backup on Arweave
    address[] guardians;        // Yamadoot wallet addresses
    uint256 totalShards;        // N (total shards generated)
    uint256 threshold;          // K (minimum shards to reconstruct)
    uint256 lastCheckin;        // Last heartbeat timestamp
    uint256 checkinInterval;    // Required check-in frequency
    bool released;              // Whether evidence is publicly available
    uint256 shardsSubmitted;    // Current shard count
}
```

**Functions:**

| Function | Access | Description |
|---|---|---|
| `createLekhaa(...)` | Anyone | Creates a new vault with all parameters |
| `checkin(vaultId)` | Satyavadi only | Resets the dead man's switch timer |
| `isTriggered(vaultId)` | View | Returns `true` if timer has expired |
| `triggerRelease(vaultId)` | Anyone | Emits trigger event if expired |
| `submitShard(vaultId, shard)` | Guardians only | Submits a key shard; auto-releases at threshold |
| `verifyEvidence(vaultId, hash)` | View | Verifies hash against on-chain record |

**Events:**

| Event | Description |
|---|---|
| `LekhaaCreated` | New vault registered on-chain |
| `CheckedIn` | Whistleblower heartbeat recorded |
| `AntimSanketTriggered` | Dead Man's Switch activated |
| `ShardSubmitted` | Guardian submits their key fragment |
| `PrakashReleased` | Evidence threshold met — publicly released |

**Security properties:**
- ❌ No admin keys — zero privileged roles
- ❌ No pause function — cannot be stopped
- ❌ No upgrade proxy — immutable after deployment
- ✅ Double-submission prevention per guardian
- ✅ Automatic release when threshold is met

### Test Coverage

```
  Deployment
    ✓ should initialize with nextVaultId = 0

  createLekhaa
    ✓ should create a vault and emit LekhaaCreated

  checkin
    ✓ should reset the dead man switch timer
    ✓ should revert if non-satyavadi calls checkin

  Dead Man Switch
    ✓ should return false before interval expires
    ✓ should revert triggerRelease before interval
    ✓ should trigger after interval expires

  submitShard & release
    ✓ should accept shard from valid guardian
    ✓ should revert shard from non-guardian
    ✓ should release evidence at threshold
    ✓ should revert post-release shard submission

  verifyEvidence
    ✓ should return true for correct hash
    ✓ should return false for incorrect hash

  13 passing
```

---

## 🔐 Cryptographic Engine

Located at `frontend/src/lib/crypto/`, the engine operates **entirely client-side**.

### Pipeline

```
File → ArrayBuffer → AES-256-GCM Encrypt → Ciphertext
                   ↓
          CryptoKey → Export to Hex → Shamir Split → N Shards
                   ↓
          wipeBuffer(plaintext) → Memory zeroed
```

### Modules

| Module | Purpose |
|---|---|
| `aes.ts` | Key gen, encrypt, decrypt via `window.crypto.subtle` |
| `sss.ts` | Key splitting & reconstruction via `secrets.js-grempe` |
| `utils.ts` | Hex/buffer conversion + `wipeBuffer()` for memory safety |
| `index.ts` | `secureEvidence()` and `recoverEvidence()` orchestrators |

### Key Security Properties

- **AES-256-GCM** — NIST-approved authenticated encryption with 256-bit keys
- **Ephemeral keys** — Each vault generates a unique key; destroyed after sharding
- **Memory sanitization** — `wipeBuffer()` zeros plaintext arrays in `finally` blocks to prevent RAM dump attacks
- **No `localStorage`** — Zero persistent storage of sensitive data in browser

---

## 🎨 Design System

Chitragupt uses a **kinetic Neo-Brutalist** visual language:

- **Heavy borders** — 3-4px solid black on everything
- **Hard offset shadows** — Flat, pixel-aligned, zero blur
- **Bold typography** — Space Grotesk (display) + Space Mono (terminal)
- **Palette** — `#FFD93D` golden · `#FF6B6B` coral · `#4ECDC4` cyan · `#1A1A1A` black
- **Physical interactions** — Elements translate on press, shadows reduce on click
- **Dot-grid background** — Animated radial gradient base layer
- **Scroll-reveal animations** — IntersectionObserver-driven fade-in-up

---

## 🔧 Technology Stack

| Layer | Technology | Version |
|---|---|---|
| **Frontend** | Next.js (App Router) | 16.2.2 |
| **UI** | React + TypeScript | 19 / 5 |
| **Styling** | TailwindCSS | 4 |
| **Contracts** | Solidity | 0.8.24 |
| **Framework** | Hardhat | 2.28.6 |
| **Blockchain** | Polygon Amoy Testnet | Chain 80002 |
| **Encryption** | Web Crypto API (AES-256-GCM) | Native |
| **Key Splitting** | secrets.js-grempe (SSS) | 2.0.0 |
| **Storage (planned)** | IPFS (Web3.Storage) + Arweave | — |
| **Automation (planned)** | Chainlink Keepers | — |

---

## 🗺️ Roadmap

| Phase | Period | Focus | Status |
|---|---|---|---|
| **Phase 1** | Q2 2026 | Core architecture — contracts, crypto engine, frontend | 🔴 Active |
| **Phase 2** | Q3 2026 | Platform integration — IPFS, Arweave, Chainlink Keepers | ⚪ Upcoming |
| **Phase 3** | Q4 2026 | Security hardening — audits, pen testing, bug bounty | ⚪ Upcoming |
| **Phase 4** | Q1 2027 | Mainnet launch — Polygon PoS, Tor service, gasless TX | ⚪ Upcoming |
| **Phase 5** | Q2 2027 | ZK expansion — zk-SNARKs identity, cross-chain CCIP | ⚪ Upcoming |
| **Phase 6** | Q4 2027+ | Enterprise grade — corporate APIs, TEE enclaves, L3 | ⚪ Upcoming |

> See [ROADMAP.md](./ROADMAP.md) for the full strategic plan and [DEVELOPMENT.md](./DEVELOPMENT.md) for comprehensive technical documentation.

---

## 📚 Sanskrit Lexicon

The protocol uses Sanskrit-derived terminology reflecting its mythological foundation as an immutable record of truth.

| English | Sanskrit | Devanagari | Technical Mapping |
|---|---|---|---|
| Whistleblower | **Satyavadi** | सत्यवादी | `msg.sender` who creates a vault |
| Vault | **Lekhaa** | लेखा | `struct Lekhaa` in smart contract |
| Evidence | **Saakshya** | साक्ष्य | Encrypted file payload |
| Guardian | **Yamadoot** | यमदूत | Wallet holding a key shard |
| Dead Man's Switch | **Antim Sanket** | अंतिम संकेत | Check-in timer expiry |
| Public Release | **Prakash** | प्रकाश | `released = true` on-chain |

---

## 🔒 Security

| Threat | Mitigation |
|---|---|
| Server compromise | No server exists — all logic is client-side + blockchain |
| MITM interception | All data encrypted before leaving the browser |
| Key recovery from memory | `wipeBuffer()` zeros buffers after use |
| Single guardian collusion | Shamir's SSS requires K-of-N threshold |
| Contract admin override | Zero admin roles or privileged functions |
| Evidence tampering | SHA-256 hash stored immutably on-chain |
| Storage destruction | Dual storage on IPFS + Arweave |
| IP tracking | Zero accounts, Tor-compatible, no analytics |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `test:`)
4. Run tests (`npx hardhat test` + `cd frontend && npm run lint`)
5. Submit a Pull Request

**Priority areas:**
- 🔴 Wallet connection (MetaMask / WalletConnect)
- 🔴 IPFS upload integration (Web3.Storage)
- 🟡 Arweave backup integration
- 🟡 Chainlink Keeper registration
- 🟢 Crypto library unit tests
- 🟢 E2E browser tests (Playwright)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⚠️ Disclaimer

Chitragupt is designed to protect truth-tellers from retaliation and censorship. The developers do not endorse use of this platform for sharing classified military secrets that endanger active operations, distributing non-consensual intimate content, facilitating extortion, or any activity violating international humanitarian law.

**The platform is a tool for accountability. Use it responsibly.**

---

<p align="center">
  <strong>सत्यम् एव जयते</strong>
  <br/>
  <em>Truth alone triumphs.</em>
</p>

<p align="center">
  Built by <a href="https://x.com/ayusheith">@ayusheith</a> · <a href="https://github.com/zynorex">zynorex</a>
</p>
