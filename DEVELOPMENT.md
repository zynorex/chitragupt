# CHITRAGUPT — Comprehensive Development Documentation

> **Version:** 1.0.0-alpha  
> **Protocol Status:** Testnet (Polygon Amoy)  
> **Last Updated:** April 2026  
> **Maintainer:** [@ayusheith](https://x.com/ayusheith) / [zynorex](https://github.com/zynorex)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Vision & Problem Statement](#2-vision--problem-statement)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [Technology Stack Breakdown](#4-technology-stack-breakdown)
5. [Repository Structure](#5-repository-structure)
6. [Smart Contract Layer](#6-smart-contract-layer)
7. [Client-Side Cryptographic Engine](#7-client-side-cryptographic-engine)
8. [Frontend Application](#8-frontend-application)
9. [Design System — Neo-Brutalist Language](#9-design-system--neo-brutalist-language)
10. [Data Flow & Lifecycle](#10-data-flow--lifecycle)
11. [Testing Strategy](#11-testing-strategy)
12. [Security Architecture](#12-security-architecture)
13. [Deployment Pipeline](#13-deployment-pipeline)
14. [Environment Variables & Configuration](#14-environment-variables--configuration)
15. [Development Workflow & Conventions](#15-development-workflow--conventions)
16. [Current State & Known Limitations](#16-current-state--known-limitations)
17. [Future Development Phases](#17-future-development-phases)
18. [Glossary — Sanskrit Lexicon](#18-glossary--sanskrit-lexicon)
19. [Contributing Guidelines](#19-contributing-guidelines)
20. [License & Legal](#20-license--legal)

---

## 1. Executive Summary

**Chitragupt** is an open-source, decentralized, censorship-proof whistleblower platform. Named after the Hindu deity who maintains the permanent, tamper-proof record of every soul's actions, the protocol guarantees that sensitive evidence cannot be deleted, silenced, intercepted, or suppressed by any authority.

The platform allows whistleblowers (Satyavadis) to:
- Upload sensitive evidence (documents, images, videos, audio) through an anonymous web interface
- Encrypt the evidence entirely client-side using **AES-256-GCM** (military-grade encryption)
- Fragment the encryption key into multiple shards using **Shamir's Secret Sharing (SSS)**
- Distribute those shards to designated Guardian wallets (**Yamadoots**) on the Polygon blockchain
- Store the encrypted payload permanently on **IPFS** and **Arweave**
- Configure a **Dead Man's Switch** (Antim Sanket) powered by **Chainlink Automation**
- Automatically trigger evidence release when the whistleblower fails to check in

**Zero plaintext ever leaves the user's browser. There is no central authority and no single point of failure.**

---

## 2. Vision & Problem Statement

### The Problem

In the modern digital landscape, whistleblowers face existential threats:

| Threat Vector | Description |
|---|---|
| **Server Seizure** | Governments or corporations can legally or physically seize centralized servers |
| **DNS Hijacking** | Authorities can redirect or block domain names |
| **Data Destruction** | Evidence stored on centralized systems can be deleted |
| **Identity Exposure** | Traditional platforms require accounts, exposing whistleblowers |
| **Single Points of Failure** | Centralized platforms (wikileaks, dropbox) can be shut down |
| **Coercion** | Whistleblowers can be pressured to retract or destroy evidence |

### The Solution

Chitragupt mathematically eliminates all of the above by distributing trust across:

- **Client-side cryptography** → No server ever sees plaintext
- **Blockchain-based state** → Immutable, globally replicated
- **Decentralized storage** → IPFS + Arweave = permanent persistence
- **Threshold cryptography** → No single entity can unseal the vault
- **Automated dead man's switch** → Evidence release without human intervention
- **Zero-identity architecture** → No accounts, no emails, no IP logging

---

## 3. System Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     CHITRAGUPT PROTOCOL                         │
├─────────────────────────────────────────────────────────────────-┤
│                                                                  │
│  ┌──────────────────────────────────────────────┐                │
│  │           BROWSER (Client Device)             │                │
│  │                                                │                │
│  │  ┌─────────┐  ┌───────────┐  ┌─────────────┐ │                │
│  │  │  File    │→ │ AES-256   │→ │  Shamir's   │ │                │
│  │  │  Input   │  │ GCM Enc.  │  │  Secret     │ │                │
│  │  │  (Raw)   │  │ (Crypto   │  │  Sharing    │ │                │
│  │  │          │  │  Subtle)  │  │  (SSS)      │ │                │
│  │  └─────────┘  └─────┬─────┘  └──────┬──────┘ │                │
│  │                      │               │         │                │
│  │              Ciphertext Blob     Key Shards    │                │
│  │                      │         [S1,S2..SN]     │                │
│  └──────────────────────┼───────────────┼─────────┘                │
│                         │               │                          │
│  ┌──────────────────────▼───────────────▼─────────┐                │
│  │              POLYGON BLOCKCHAIN                 │                │
│  │                                                  │                │
│  │   Chitragupt.sol (Lekhaa Smart Contract)        │                │
│  │   ┌──────────────────────────────────────┐      │                │
│  │   │  evidenceHash      (SHA-256)          │      │                │
│  │   │  ipfsCID            (Encrypted CID)   │      │                │
│  │   │  arweaveTxId        (Backup CID)      │      │                │
│  │   │  guardians[]        (Yamadoot Addrs)  │      │                │
│  │   │  threshold          (K of N)          │      │                │
│  │   │  checkinInterval    (Seconds)         │      │                │
│  │   │  lastCheckin        (Timestamp)       │      │                │
│  │   │  released           (Bool)            │      │                │
│  │   └──────────────────────────────────────┘      │                │
│  └──────────────────────────────────────────────────┘                │
│                         │                                            │
│  ┌──────────────────────▼──────────────────────────┐                │
│  │           DECENTRALIZED STORAGE                  │                │
│  │                                                  │                │
│  │   ┌──────────┐          ┌──────────────┐        │                │
│  │   │   IPFS   │          │   ARWEAVE    │        │                │
│  │   │ (Primary)│          │  (Permanent  │        │                │
│  │   │  via     │          │   Backbone)  │        │                │
│  │   │ web3.stg │          │   200+ years │        │                │
│  │   └──────────┘          └──────────────┘        │                │
│  └──────────────────────────────────────────────────┘                │
│                                                                      │
│  ┌──────────────────────────────────────────────────┐                │
│  │         CHAINLINK AUTOMATION (KEEPERS)            │                │
│  │                                                    │                │
│  │   Monitors: block.timestamp > lastCheckin +        │                │
│  │             checkinInterval                       │                │
│  │                                                    │                │
│  │   On Trigger: Emits AntimSanketTriggered event    │                │
│  │   → Guardians authorized to submit shards         │                │
│  │   → Threshold reached → PrakashReleased           │                │
│  └──────────────────────────────────────────────────┘                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Architectural Principles

| Principle | Implementation |
|---|---|
| **Zero-Trust** | No server, no admin, no identity layer |
| **Client-Side Only** | All cryptography in browser via Web Crypto API |
| **Decentralized State** | Polygon smart contracts (immutable) |
| **Redundant Storage** | IPFS + Arweave (dual persistence) |
| **Threshold Security** | Shamir's Secret Sharing (K-of-N reconstruction) |
| **Automated Failsafe** | Chainlink Keepers (Dead Man's Switch) |
| **Anonymity by Default** | Tor-compatible, zero-account architecture |

---

## 4. Technology Stack Breakdown

### 4.1 Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.2 | React meta-framework with App Router |
| **React** | 19.2.4 | UI component library |
| **TypeScript** | ^5 | Type-safe JavaScript |
| **TailwindCSS** | ^4 | Utility-first CSS (with custom Neo-Brutalist system) |
| **Space Grotesk** | Google Font | Primary display typeface |
| **Space Mono** | Google Font | Monospace / terminal typeface |
| **react-dropzone** | ^15.0.0 | File upload drag-and-drop |
| **secrets.js-grempe** | ^2.0.0 | Shamir's Secret Sharing implementation |
| **Web Crypto API** | Native | Browser-native AES-256-GCM encryption |

### 4.2 Smart Contracts

| Technology | Version | Purpose |
|---|---|---|
| **Solidity** | 0.8.24 | Smart contract language |
| **Hardhat** | ^2.28.6 | Development framework, testing, deployment |
| **@nomicfoundation/hardhat-toolbox** | ^5.0.0 | Hardhat plugin suite (Ethers, Chai, etc.) |
| **Ethers.js** | ^6.16.0 | Ethereum library for contract interaction |
| **dotenv** | ^17.4.0 | Environment variable management |

### 4.3 Blockchain Network

| Network | Chain ID | Purpose |
|---|---|---|
| **Polygon Amoy (Testnet)** | 80002 | Current deployment target |
| **Polygon PoS / zkEVM (Mainnet)** | — | Future production deployment |

### 4.4 Planned Integrations (Not Yet Implemented)

| Technology | Purpose |
|---|---|
| **Web3.Storage** | IPFS gateway for encrypted payload persistence |
| **Arweave JS SDK** | Permanent backup storage layer |
| **Chainlink Keepers** | Decentralized Dead Man Switch automation |
| **ethers.js / WalletConnect** | Browser wallet interaction |
| **Push Protocol** | Decentralized anonymous notifications |
| **The Graph** | Subgraph indexing for fast state reads |

---

## 5. Repository Structure

```
chitragupt/
│
├── contracts/                          # Solidity smart contracts
│   └── Chitragupt.sol                 # Core vault contract (199 lines)
│
├── scripts/                            # Deployment scripts
│   └── deploy.js                      # Hardhat deployment to Polygon Amoy
│
├── test/                               # Smart contract test suite
│   └── Chitragupt.test.js            # Comprehensive Hardhat tests (157 lines)
│
├── frontend/                           # Next.js 16 application
│   ├── src/
│   │   ├── app/                       # App Router pages
│   │   │   ├── layout.tsx            # Root layout (fonts, navbar, footer)
│   │   │   ├── page.tsx              # Landing page (511 lines)
│   │   │   ├── globals.css           # Neo-Brutalist design system (429 lines)
│   │   │   ├── about/page.tsx        # Manifesto / story page
│   │   │   ├── features/page.tsx     # Technical features showcase
│   │   │   ├── shabd-kosh/page.tsx   # Documentation / glossary
│   │   │   ├── submit/page.tsx       # Evidence submission portal
│   │   │   ├── dashboard/page.tsx    # Whistleblower vault management
│   │   │   ├── guardian/page.tsx     # Yamadoot shard operations
│   │   │   ├── verify/page.tsx       # SHA-256 hash verification
│   │   │   └── cryptotest/page.tsx   # Crypto engine sandbox
│   │   │
│   │   ├── components/               # Shared UI components
│   │   │   ├── Navbar.tsx            # Floating brutalist navbar (228 lines)
│   │   │   └── Footer.tsx            # Terminal-inspired footer (121 lines)
│   │   │
│   │   └── lib/                      # Core libraries
│   │       └── crypto/               # Client-side cryptographic engine
│   │           ├── index.ts          # Orchestrator (secureEvidence, recoverEvidence)
│   │           ├── aes.ts            # AES-256-GCM encrypt/decrypt
│   │           ├── sss.ts            # Shamir's Secret Sharing split/reconstruct
│   │           └── utils.ts          # Buffer/Hex conversion + memory wipe
│   │
│   └── package.json                  # Frontend dependencies
│
├── hardhat.config.js                  # Hardhat configuration (Polygon Amoy)
├── package.json                       # Root dependencies (Hardhat/Ethers)
├── README.md                          # Project overview
├── ROADMAP.md                         # Strategic development roadmap
├── DEVELOPMENT.md                     # ← THIS FILE
└── .gitignore                         # Dependency/artifact exclusions
```

---

## 6. Smart Contract Layer

### 6.1 Contract: `Chitragupt.sol`

**Location:** `contracts/Chitragupt.sol`  
**Solidity Version:** `^0.8.24`  
**License:** MIT  

The smart contract serves as the immutable, trust-minimized backbone of the protocol. It stores no sensitive data — only hashes, encrypted CIDs, and address mappings.

#### Core Data Structure — `Lekhaa` (Vault)

```solidity
struct Lekhaa {
    bytes32 evidenceHash;       // SHA-256 of original evidence (Saakshya)
    string ipfsCID;             // Encrypted evidence storage on IPFS
    string arweaveTxId;         // Redundant encrypted storage on Arweave
    address[] guardians;        // Array of Yamadoot wallet addresses
    uint256 totalShards;        // N (total number of shards generated)
    uint256 threshold;          // K (minimum shards needed)
    uint256 lastCheckin;        // Block timestamp of last check-in
    uint256 checkinInterval;    // Required check-in frequency (seconds)
    bool released;              // Whether evidence has been publicly released
    uint256 shardsSubmitted;    // Count of submitted shards so far
}
```

#### State Variables & Mappings

| Variable | Type | Purpose |
|---|---|---|
| `nextVaultId` | `uint256` | Auto-incrementing vault counter |
| `vaults` | `mapping(uint256 => Lekhaa)` | Vault ID → Vault data |
| `satyavadiOf` | `mapping(uint256 => address)` | Vault ID → Whistleblower address |
| `guardianVaults` | `mapping(address => uint256[])` | Guardian → list of vault IDs they guard |
| `hasSubmittedShard` | `mapping(uint256 => mapping(address => bool))` | Per-vault shard submission tracking |

#### Events

| Event | When Emitted |
|---|---|
| `LekhaaCreated(vaultId, satyavadi, checkinInterval)` | New vault is created |
| `CheckedIn(vaultId, timestamp)` | Whistleblower successfully checks in |
| `AntimSanketTriggered(vaultId)` | Dead Man's Switch is triggered |
| `ShardSubmitted(vaultId, yamadoot, shard, totalSubmitted)` | Guardian submits their key shard |
| `PrakashReleased(vaultId)` | Threshold reached; evidence publicly released |

#### Public Functions

| Function | Access | Description |
|---|---|---|
| `createLekhaa(...)` | Anyone | Creates a new vault with evidence hash, storage CIDs, guardians list, threshold, and check-in interval |
| `checkin(vaultId)` | Satyavadi only | Resets the dead man's switch timer |
| `isTriggered(vaultId)` | View (anyone) | Returns `true` if `block.timestamp > lastCheckin + checkinInterval` |
| `triggerRelease(vaultId)` | Anyone | Emits `AntimSanketTriggered` if timer has expired |
| `submitShard(vaultId, shard)` | Guardians only | Guardian submits their key shard; auto-releases if threshold met |
| `getLekhaa(vaultId)` | View (anyone) | Returns all vault data fields |
| `verifyEvidence(vaultId, hash)` | View (anyone) | Checks if a provided hash matches the stored evidence hash |

#### Access Control Modifiers

| Modifier | Logic |
|---|---|
| `onlyUnreleased(vaultId)` | Reverts if vault is already released |
| `validVault(vaultId)` | Reverts if vault ID doesn't exist |

#### Security Considerations

- **No admin keys.** The contract has zero privileged roles. No one can pause, upgrade, or override.
- **On-chain shard storage.** Shards are emitted via events (not stored in contract state), making them publicly readable but only useful when combined.
- **Guardian verification.** `submitShard()` iterates the guardians array to verify caller identity.
- **Double-submission prevention.** The `hasSubmittedShard` mapping prevents a guardian from submitting twice.
- **Automatic release.** When `shardsSubmitted >= threshold`, the vault is marked `released = true` in the same transaction.

### 6.2 Deployment Script

**Location:** `scripts/deploy.js`

```javascript
import hre from "hardhat";

async function main() {
  const Chitragupt = await hre.ethers.getContractFactory("Chitragupt");
  const chitragupt = await Chitragupt.deploy();
  await chitragupt.waitForDeployment();
  console.log(`Chitragupt deployed to ${await chitragupt.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Deployment Command:**
```bash
npx hardhat run scripts/deploy.js --network polygonAmoy
```

### 6.3 Hardhat Configuration

**Location:** `hardhat.config.js`

```javascript
export default {
  solidity: "0.8.24",
  networks: {
    polygonAmoy: {
      url: process.env.NEXT_PUBLIC_POLYGON_RPC || "https://rpc-amoy.polygon.technology",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [{
      network: "polygonAmoy",
      chainId: 80002,
      urls: {
        apiURL: "https://api-amoy.polygonscan.com/api",
        browserURL: "https://amoy.polygonscan.com"
      }
    }]
  }
};
```

---

## 7. Client-Side Cryptographic Engine

The cryptographic engine is the most security-critical component of the platform. It operates **entirely within the user's browser** using the native `window.crypto.subtle` Web Crypto API — ensuring zero plaintext exposure to any external server.

### 7.1 Module Structure

```
frontend/src/lib/crypto/
├── index.ts    → Orchestrator: secureEvidence(), recoverEvidence()
├── aes.ts      → AES-256-GCM: key generation, encrypt, decrypt
├── sss.ts      → Shamir's Secret Sharing: split, reconstruct  
└── utils.ts    → Buffer utilities + memory sanitization
```

### 7.2 AES-256-GCM Module (`aes.ts`)

This module handles all symmetric encryption operations using the browser's native crypto APIs.

**Constants:**
- Algorithm: `AES-GCM`
- Key Length: `256` bits
- IV Length: `12` bytes (96 bits, NIST recommended for GCM)

**Exported Functions:**

| Function | Signature | Description |
|---|---|---|
| `generateAESKey()` | `() → Promise<CryptoKey>` | Generates an extractable AES-256-GCM key via `crypto.subtle.generateKey()` |
| `exportKeyToHex(key)` | `(CryptoKey) → Promise<string>` | Exports raw key bytes to hex string, then wipes the raw buffer |
| `importKeyFromHex(hex)` | `(string) → Promise<CryptoKey>` | Imports a hex string back into a `CryptoKey`, wipes intermediate buffer |
| `encryptData(key, data)` | `(CryptoKey, Uint8Array) → Promise<EncryptedPayload>` | Encrypts data with random IV; returns `{ciphertext, iv}` |
| `decryptData(key, payload)` | `(CryptoKey, EncryptedPayload) → Promise<Uint8Array>` | Decrypts ciphertext using stored IV |

**Data Type:**
```typescript
interface EncryptedPayload {
  ciphertext: Uint8Array;
  iv: Uint8Array;
}
```

### 7.3 Shamir's Secret Sharing Module (`sss.ts`)

Uses the `secrets.js-grempe` library — a battle-tested JavaScript implementation of Shamir's Secret Sharing algorithm.

**Exported Functions:**

| Function | Signature | Description |
|---|---|---|
| `splitKey(hexKey, totalShards, threshold)` | `(string, number, number) → Shard[]` | Splits hex key into N shares with K threshold |
| `reconstructKey(shards)` | `(Shard[]) → string` | Combines K+ shards to reconstruct the original hex key |

**Data Type:**
```typescript
interface Shard {
  id: number;    // Extracted share ID
  data: string;  // Full hex share string from secrets.js
}
```

**Validation:** Throws an error if `threshold > totalShards` or if zero shards are provided for reconstruction.

### 7.4 Utility Module (`utils.ts`)

Handles buffer conversions and critical memory sanitization.

| Function | Purpose |
|---|---|
| `bufferToHex(buffer)` | Converts `Uint8Array` → hex string |
| `hexToBuffer(hexString)` | Converts hex string → `Uint8Array` (validates even length) |
| `wipeBuffer(buffer)` | Fills `Uint8Array` with zeros to prevent RAM dumping |
| `wipeArrayBuffer(buffer)` | Wraps an `ArrayBuffer` as `Uint8Array` and zeros it |

> **Critical Security Note:** The `wipeBuffer` functions exist to prevent OS-level RAM dump attacks. While JavaScript's garbage collector will eventually free memory, zeroing the buffer first ensures that a physical memory snapshot cannot recover plaintext data.

### 7.5 Orchestrator (`index.ts`)

The `index.ts` file provides the two high-level functions consumed by the frontend.

#### `secureEvidence(file, numGuardians, threshold)`

**Full encryption + sharding pipeline:**

```
File → arrayBuffer() → Uint8Array
    → generateAESKey()
    → encryptData(key, fileBuffer)        → EncryptedPayload
    → exportKeyToHex(key)                → hexKey
    → splitKey(hexKey, N, K)             → Shard[]
    → FINALLY: wipeBuffer(fileBuffer)    → Plaintext destroyed
    
Returns: { encryptedData: EncryptedPayload, shards: Shard[] }
```

#### `recoverEvidence(payload, shards, mimeType, filename)`

**Full reconstruction pipeline:**

```
Shard[] → reconstructKey(shards)          → hexKey
       → importKeyFromHex(hexKey)        → CryptoKey
       → decryptData(key, payload)       → decryptedBuffer
       → new Blob([decryptedBuffer])     → Blob
       → new File([blob], filename)      → File
       → FINALLY: wipeBuffer(decrypted)  → Decrypted data destroyed
       
Returns: File
```

---

## 8. Frontend Application

### 8.1 Application Shell

**Root Layout:** `frontend/src/app/layout.tsx`

The root layout establishes:
- **Font Loading:** Space Grotesk (display) and Space Mono (monospace) via `next/font/google`
- **CSS Variables:** `--font-display` and `--font-mono-google` for font switching
- **Global Background:** Animated dot-grid pattern on golden (`#FFD93D`) base
- **SEO Metadata:** Title, description, and keyword meta tags
- **Component Hierarchy:** `<Navbar />` → `<main>{children}</main>` → `<Footer />`

### 8.2 Pages

The application uses Next.js App Router with the following route structure:

| Route | Component | Purpose | Lines |
|---|---|---|---|
| `/` | `page.tsx` | Landing page — Hero, Features, How It Works, Terminology, CTA | 511 |
| `/about` | `about/page.tsx` | Manifesto — Mythological lore, system mechanics, dark CTA | 144 |
| `/features` | `features/page.tsx` | Technical feature cards with interactive progress bars | 105 |
| `/shabd-kosh` | `shabd-kosh/page.tsx` | Full protocol documentation with sticky sidebar TOC | 218 |
| `/submit` | `submit/page.tsx` | Evidence submission — file upload, guardian configuration, encryption | 230 |
| `/dashboard` | `dashboard/page.tsx` | Whistleblower portal — active vaults, dead man's switch check-in | 125 |
| `/guardian` | `guardian/page.tsx` | Yamadoot operations — shard management, triggered vault response | 88 |
| `/verify` | `verify/page.tsx` | Hash verification — SHA-256 computation + blockchain comparison | 76 |
| `/cryptotest` | `cryptotest/page.tsx` | Crypto sandbox — end-to-end encrypt/decrypt testing | 135 |

#### Landing Page (`/`) — Deep Dive

The landing page is the most complex component, featuring:

1. **Hybrid Skeleton Loading System:** A 1.8-second simulated load with `SkeletonWrap` components that mirror the exact page layout to prevent CLS (Cumulative Layout Shift).

2. **ScrambleText Component:** A cinematic text reveal effect using `IntersectionObserver` — text transitions from blurred/transparent to sharp/opaque with configurable delay.

3. **useScrollReveal Hook:** Adds `fade-in-up` CSS animation class to `.reveal-on-scroll` elements when they enter the viewport.

4. **Sections:**
   - `HeroSection` — Headline ("Truth Cannot Be Deleted."), Sanskrit subline, stats bar
   - `MarqueeStrip` — Infinite horizontal scroll of protocol keywords
   - `FeaturesSection` — 8 brutalist cards with icon boxes, Sanskrit subtitles
   - `HowItWorksSection` — 6-step process grid with numbered step circles
   - `TerminologySection` — Sanskrit/Devanagari/English term cards
   - `CTASection` — Call-to-action with decorative corner crosses

#### Submit Page (`/submit`) — Deep Dive

The submission flow is a multi-step wizard:

1. **Step 01 — File Selection:** `react-dropzone` integration with drag-and-drop, max 50MB, file metadata display.
2. **Step 02 — Guardian Parameters:** Configurable N (total guardians, 3-10) and K (threshold, 2-N), with numbered wallet address inputs.
3. **Encryption Overlay:** Full-screen `brutal-skeleton` overlay during the 3-second encryption simulation.
4. **Success State:** Animated result card with RAM execution log output and "SIGN TRANSACTION" CTA.

> **Current State:** The Submit page currently uses a **simulated encryption** flow (`secrets.str2hex` + `secrets.share`) rather than the full `secureEvidence()` pipeline. This is intended as a UI architecture demonstration.

#### Dashboard Page (`/dashboard`)

- **Dead Man's Switch Button:** A 192×192px circular button with physical press animation (15px shadow → 0 on press) that simulates the `checkin()` blockchain transaction.
- **Active Vaults List:** Mock data showing vault IDs, next check-in countdowns, and threshold configurations.
- **Connected Identity Display:** Mock wallet address badge.

#### Guardian Page (`/guardian`)

- **Triggered Vault Panel:** Split-view card with coral background when triggered, showing shard count vs. threshold and "PUBLISH SHARD" action.
- **Sealed Vault Panel:** Lock icon state indicating the whistleblower is still checking in.

#### Verify Page (`/verify`)

- **Client-Side SHA-256:** Uses `crypto.subtle.digest('SHA-256', buffer)` to compute the hash of a dropped file.
- **Comparison Interface:** Input field for pasting the on-chain hash with a "COMPARE" button.

#### Crypto Sandbox (`/cryptotest`)

- **Full Pipeline Test:** Actually calls `secureEvidence()` and `recoverEvidence()` from the crypto library.
- **Performance Metrics:** Logs encryption/decryption duration via `performance.now()`.
- **Media Preview:** Renders recovered images, videos, and text files inline.
- **Shard Inspection:** Displays raw shard hex strings with truncation.

### 8.3 Shared Components

#### Navbar (`Navbar.tsx` — 228 lines)

A floating, scroll-aware navigation bar:

| Feature | Implementation |
|---|---|
| **Floating Position** | `fixed` with dynamic `top` value based on scroll position |
| **Scroll Awareness** | Shadow transitions from `12px` to `6px` on scroll |
| **Desktop Navigation** | Features, About, Shabd Kosh links + "PORTALS" dropdown |
| **Portals Dropdown** | Hover-activated mega-menu with 5 portal entries (descriptions + links) |
| **Status Indicator** | Animated pulse dot with "network_secure" label |
| **Mobile Menu** | Full slide-down panel with categorized links (General + Portals) |
| **Active State** | Golden background for matching `pathname` in dropdown items |
| **CTA Button** | "OPEN VAULT" linking to `/submit` |

#### Footer (`Footer.tsx` — 121 lines)

A terminal-inspired footer with:

| Feature | Description |
|---|---|
| **Brand Block** | Massive "CHITRAGUPT" heading with `Protocol Architecture` label |
| **Social Links** | GitHub, X (Twitter), Documentation — brutalist button style |
| **Sitemap** | Animated hover links with slide-in arrow indicator |
| **System Data** | Contract ID, Storage type, Encryption info cards |
| **Network Status Card** | "Amoy Network Active" with spinning loader and "SUBMIT EVIDENCE" CTA |
| **Bottom Bar** | Copyright + Devanagari watermark (सत्यम् एव जयते) |

---

## 9. Design System — Neo-Brutalist Language

### 9.1 Design Philosophy

Chitragupt's visual identity is a **kinetic Neo-Brutalist** design system — characterized by:

- **Heavy borders** (3-4px solid black)
- **Hard offset shadows** (flat, pixel-aligned, zero blur)
- **Bold typography** (uppercase monospace terminals, large display headings)
- **High contrast** (golden yellow, coral red, cyan teal, charcoal black)
- **Interactive displacement** (elements physically move on hover/click)
- **Geometric decorations** (crosses, dots, rotating squares)

### 9.2 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-golden` | `#FFD93D` | Primary background, CTA highlights |
| `--color-golden-light` | `#FFEA80` | Hover states |
| `--color-golden-dark` | `#E6C235` | Shadow accents |
| `--color-ivory` | `#FFF8E7` | Card hover, input backgrounds |
| `--color-black` | `#1A1A1A` | Text, borders, shadows |
| `--color-charcoal` | `#2D2D2D` | Footer background, secondary text |
| `--color-gray` | `#6B6B6B` | Muted text |
| `--color-cyan` | `#4ECDC4` | Accent (positive/guardian) |
| `--color-coral` | `#FF6B6B` | Accent (danger/trigger/CTA) |
| `--color-green` | `#2D6A4F` | Active status |
| `--color-purple` | `#7B68EE` | Tertiary accent |
| `--color-saffron` | `#FF6B00` | Warning accent |

### 9.3 Typography

| Token | Font | Weight(s) | Usage |
|---|---|---|---|
| `--font-display` | Space Grotesk | 400–700 | Headlines, section titles, buttons |
| `--font-mono` | Space Mono | 400, 700 | Code, labels, technical data, badges |
| `--font-body` | Space Grotesk | 400–600 | Body text, descriptions |

### 9.4 Component Classes

#### `.brutal-card`
```css
background: white
border: 3px solid #1A1A1A
box-shadow: 5px 5px 0px #1A1A1A
border-radius: 8px
Hover: translate(3px, 3px) rotate(-1deg), shadow reduces to 2px
```

#### `.brutal-btn`
```css
padding: 12px 28px
border: 3px solid #1A1A1A
box-shadow: 5px 5px 0px #1A1A1A
text-transform: uppercase
Hover: Skewed light sweep + translate(3px, 3px)
Active: Shadow disappears + translate(5px, 5px)
Variants: -primary (golden), -dark (black), -white, -coral
```

#### `.brutal-badge`
```css
font: Space Mono, 0.75rem, bold
border: 2px solid #1A1A1A
box-shadow: 2px 2px 0px #1A1A1A
text-transform: uppercase
letter-spacing: 1px
```

#### `.brutal-skeleton`
```css
background: ivory with repeating diagonal stripes
border: 3px solid #1A1A1A
Animations:
  - Stripe pan (0.8s, infinite)
  - Coral scanner line (2s vertical sweep)
  - ::before content: 'ENCRYPTING...'
  - Hover: shake + coral border
```

### 9.5 Animations

| Animation | Duration | Description |
|---|---|---|
| `bg-pan` | 40s | Infinite dot-grid background panning |
| `marquee` | 20s | Horizontal text marquee strip |
| `float` | 4s | Gentle vertical bounce with rotation |
| `spin-slow` | 20s | Slow continuous rotation |
| `fade-in-up` | 0.8s | Scroll reveal (translate Y + opacity) |
| `pulse-ring` | 2s | Expanding/fading ring pulse |
| `brutal-stripes` | 0.8s | Skeleton stripe movement |
| `brutal-scan` | 2s | Skeleton vertical scanner line |
| `brutal-shake` | 0.4s | Skeleton hover shake |

### 9.6 Special Effects

- **Dot Grid Background:** Animated radial gradient dots (`1.5px`, 24px spacing, 40% opacity) panning infinitely on the body `::before` pseudo-element.
- **Custom Scrollbar:** 14px width, golden track, black thumb with golden border.
- **Selection Colors:** Charcoal background, white text.
- **ScrambleText:** IntersectionObserver-triggered blur-to-sharp reveal with 1200ms ease-out.

---

## 10. Data Flow & Lifecycle

### 10.1 Evidence Submission Flow

```
USER ACTION                       SYSTEM PROCESS                         OUTPUT
────────────                      ──────────────                         ──────

1. Select File               →   File object stored in React state       File metadata displayed
                                  
2. Configure Guardians       →   N, K, and wallet addresses set          Guardian form populated
                                  
3. Click "Generate Shards"   →   processEncryption() called
                                  
   3a. File → ArrayBuffer    →   file.arrayBuffer()                      Raw bytes in memory
                                  
   3b. Generate AES Key      →   crypto.subtle.generateKey()             CryptoKey object
                                  
   3c. Encrypt Buffer        →   crypto.subtle.encrypt(AES-GCM)          {ciphertext, iv}
                                  
   3d. Export Key to Hex      →   crypto.subtle.exportKey("raw")          64-char hex string
                                  
   3e. Split Key (SSS)       →   secrets.share(hex, N, K)                N shard hex strings
                                  
   3f. Wipe Plaintext        →   fileBuffer.fill(0)                      Plaintext destroyed
                                  
   3g. Hash Original File    →   crypto.subtle.digest("SHA-256")         32-byte evidence hash
                                  
4. Upload to IPFS            →   web3.storage upload (encrypted blob)     IPFS CID returned
                                  
5. Upload to Arweave         →   arweave.createTransaction()              Arweave TX ID returned
                                  
6. Create Lekhaa on-chain    →   chitragupt.createLekhaa(                 Vault ID emitted
                                   evidenceHash,
                                   ipfsCID,
                                   arweaveTxId,
                                   guardianAddresses[],
                                   threshold,
                                   checkinInterval
                                 )
                                  
7. Distribute Shards         →   Each shard encrypted to individual       Guardians notified
                                  guardian's public key (planned)
```

### 10.2 Dead Man's Switch Lifecycle

```
                 ┌─────────────────────────────┐
                 │     Whistleblower Creates    │
                 │     Lekhaa (Vault Record)    │
                 └──────────────┬──────────────┘
                                │
                     lastCheckin = block.timestamp
                                │
                 ┌──────────────▼──────────────┐
        ┌────── │     MONITORING STATE         │ ◄─────────┐
        │       │  (Chainlink Keeper watches)  │           │
        │       └──────────────┬───────────────┘           │
        │                      │                            │
        │          Is block.timestamp >                     │
        │        lastCheckin + interval?                    │
        │                      │                            │
        │              No ─────┤───── Yes                   │
        │                      │        │                   │
        │       ┌──────────────▼──┐     │                   │
        │       │  Whistleblower  │     │                   │
        │       │  calls checkin()│     │                   │
        │       └────────┬────────┘     │                   │
        │                │              │                   │
        │      lastCheckin = now        │                   │
        │                │              │                   │
        └────────────────┘              │                   │
                                        │                   │
                 ┌──────────────────────▼───────┐           │
                 │    TRIGGERED STATE            │           │
                 │  AntimSanketTriggered event   │           │
                 └──────────────┬───────────────┘           │
                                │                            │
                   Guardians submit shards                   │
                   via submitShard(vaultId, shard)           │
                                │                            │
                 ┌──────────────▼───────────────┐           │
                 │  shardsSubmitted >= threshold? │           │
                 └──────────────┬───────────────┘           │
                                │                            │
                        Yes ────┤                            │
                                │                            │
                 ┌──────────────▼───────────────┐           │
                 │       PRAKASH RELEASED        │           │
                 │   Evidence publicly available │           │
                 │   vault.released = true       │           │
                 └──────────────────────────────┘
```

### 10.3 Evidence Recovery Flow

```
1. Collect K shards from guardians (on-chain ShardSubmitted events)
2. reconstructKey(shards) → hexKey
3. importKeyFromHex(hexKey) → CryptoKey
4. Fetch encrypted blob from IPFS/Arweave using stored CID
5. decryptData(key, {ciphertext, iv}) → decryptedBuffer
6. Reconstruct File object → publicly accessible
7. Verify: crypto.subtle.digest("SHA-256", decrypted) === evidenceHash
```

---

## 11. Testing Strategy

### 11.1 Smart Contract Tests

**Location:** `test/Chitragupt.test.js`  
**Framework:** Hardhat + Chai + `@nomicfoundation/hardhat-network-helpers`

#### Test Suites

| Suite | Tests | Coverage |
|---|---|---|
| **Deployment** | 1 | Initial state — `nextVaultId == 0` |
| **createLekhaa** | 1 | Vault creation, event emission, state verification |
| **checkin** | 2 | Timer reset (success), unauthorized caller (revert) |
| **Dead Man's Switch** | 3 | Initial false, premature trigger (revert), post-interval trigger |
| **submitShard & release** | 4 | Shard submission, non-guardian revert, threshold release, post-release revert |
| **verifyEvidence** | 2 | Correct hash (true), incorrect hash (false) |
| **Total** | **13** | Core contract logic fully covered |

#### Test Configuration

- **Signers:** `owner`, `satyavadi`, 5 `yamadoots`, `random`
- **Mock Data:** `evidenceHash` (keccak256), `ipfsCID` ("QmTestCID"), `arweaveTxId` ("ArweaveTxId123")
- **Parameters:** Threshold = 3, Total = 5, Interval = 72 hours
- **Time Manipulation:** Uses `@nomicfoundation/hardhat-network-helpers` `time.increase()` for dead man switch testing

**Run Tests:**
```bash
npx hardhat test
```

### 11.2 Frontend Crypto Tests

The `/cryptotest` page serves as a manual end-to-end integration test:

1. Select a file → Calls `secureEvidence(file, 5, 3)`
2. Verify ciphertext length and shard generation
3. Click "Recover File" → Calls `recoverEvidence(payload, shards.slice(0,3), mimeType, filename)`
4. Compare recovered file against original (visual comparison for images/video)
5. Monitor `performance.now()` timings in console

### 11.3 Planned Test Expansion

| Test Area | Status | Tool |
|---|---|---|
| Smart Contract Unit Tests | ✅ Complete | Hardhat/Chai |
| Crypto Library Unit Tests | 🔜 Planned | Vitest / Jest + JSDOM |
| Frontend Component Tests | 🔜 Planned | React Testing Library |
| E2E Browser Tests | 🔜 Planned | Playwright |
| Gas Optimization Reports | 🔜 Planned | Hardhat Gas Reporter |
| Fuzz Testing (Contracts) | 🔜 Planned | Foundry / Echidna |
| Property-Based Testing | 🔜 Planned | fast-check |

---

## 12. Security Architecture

### 12.1 Threat Model

| Threat | Mitigation |
|---|---|
| **Server compromise** | No server exists; all logic is client-side + blockchain |
| **MITM interception** | All data encrypted before leaving the browser |
| **Key recovery from memory** | `wipeBuffer()` zeros plaintext + key buffers after use |
| **Single guardian collusion** | Shamir's SSS requires K-of-N threshold; no single shard is useful |
| **Contract admin override** | Contract has zero admin roles or privileged functions |
| **Evidence tampering** | SHA-256 hash stored immutably on-chain at submission time |
| **Storage destruction** | Dual storage on IPFS + Arweave (content-addressed + permanent) |
| **Check-in coercion** | Only the original Satyavadi address can call `checkin()` |
| **DNS/hosting takedown** | Future: IPFS-hosted frontend via ENS + Fleek |
| **IP tracking** | No accounts, Tor compatibility, no analytics |
| **Browser state leakage** | No `localStorage` or `sessionStorage` for sensitive data |

### 12.2 Cryptographic Guarantees

| Property | Implementation |
|---|---|
| **Confidentiality** | AES-256-GCM (NIST-approved, 256-bit key, authenticated encryption) |
| **Integrity** | GCM mode provides built-in authentication tag |
| **Key Distribution** | Shamir's polynomial interpolation (information-theoretically secure) |
| **Evidence Authenticity** | SHA-256 hash stored immutably on Polygon blockchain |
| **Forward Secrecy** | Each vault generates a unique ephemeral AES key |
| **Memory Safety** | Explicit buffer zeroing via `wipeBuffer()` in `finally` blocks |

### 12.3 Security Audit Status

| Audit Type | Status |
|---|---|
| Internal Code Review | ✅ Ongoing |
| Third-Party Contract Audit | 🔜 Planned (Phase 3) |
| Client-Side Crypto Review | 🔜 Planned (Phase 3) |
| Penetration Testing | 🔜 Planned (Phase 3) |
| Bug Bounty Program | 🔜 Planned (Phase 3 — Immunefi) |
| Formal Verification | 🔜 Planned (Phase 3) |

---

## 13. Deployment Pipeline

### 13.1 Smart Contract Deployment

#### Local Development
```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Start local Hardhat node
npx hardhat node

# Deploy to local node
npx hardhat run scripts/deploy.js --network localhost
```

#### Testnet Deployment (Polygon Amoy)
```bash
# Ensure .env is configured with PRIVATE_KEY and POLYGON_RPC
npx hardhat run scripts/deploy.js --network polygonAmoy

# Verify on PolygonScan
npx hardhat verify --network polygonAmoy <DEPLOYED_ADDRESS>
```

### 13.2 Frontend Deployment

#### Local Development
```bash
cd frontend
npm install
npm run dev
# → Available at http://localhost:3000
```

#### Production Build
```bash
cd frontend
npm run build
npm start
# → Production server at http://localhost:3000
```

#### Planned Deployment Targets

| Platform | Purpose | Status |
|---|---|---|
| **Vercel** | Primary hosting (SSR/ISR) | 🔜 Planned |
| **IPFS + ENS** | Immutable frontend (Fleek) | 🔜 Phase 3 |
| **Tor Hidden Service** | `.onion` access | 🔜 Phase 4 |

---

## 14. Environment Variables & Configuration

### Root `.env` (for smart contracts)

```env
# Required for deployment
PRIVATE_KEY=<deployer-wallet-private-key>
NEXT_PUBLIC_POLYGON_RPC=https://rpc-amoy.polygon.technology

# Optional for PolygonScan verification
ETHERSCAN_API_KEY=<polygonscan-api-key>
```

### Frontend `.env.local` (planned)

```env
# Contract address after deployment
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# Polygon RPC
NEXT_PUBLIC_POLYGON_RPC=https://rpc-amoy.polygon.technology

# Web3.Storage API token (for IPFS uploads)
NEXT_PUBLIC_W3S_TOKEN=<web3-storage-api-token>

# Arweave wallet keyfile path
ARWEAVE_KEY_PATH=./arweave-key.json
```

---

## 15. Development Workflow & Conventions

### 15.1 Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `develop` | Active development integration |
| `feature/*` | Individual feature branches |
| `fix/*` | Bug fix branches |
| `audit/*` | Security audit response branches |

### 15.2 Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(contracts): add guardian vote weight system
fix(crypto): prevent IV reuse across encryptions
docs(readme): update deployment instructions
test(contract): add fuzz tests for threshold edge cases
style(ui): adjust brutal card hover animation timing
refactor(sss): extract validation into separate function
security(crypto): implement constant-time buffer comparison
```

### 15.3 Code Conventions

| Rule | Standard |
|---|---|
| **TypeScript** | Strict mode, explicit return types for public APIs |
| **Solidity** | NatSpec documentation for all public/external functions |
| **Component Naming** | PascalCase for components, camelCase for functions |
| **CSS** | Design system tokens only; no ad-hoc colors or spacing |
| **SVG Icons** | Inline SVG components with `strokeLinecap="square"` for brutalist aesthetic |
| **State Management** | React hooks (`useState`, `useEffect`); no external state library |
| **Error Handling** | `try/finally` blocks for crypto buffer cleanup |
| **Memory Safety** | Always call `wipeBuffer()` in `finally` blocks after crypto operations |

### 15.4 Linting

```bash
# Frontend
cd frontend
npm run lint   # ESLint with eslint-config-next
```

---

## 16. Current State & Known Limitations

### 16.1 What's Built ✅

| Component | Status | Notes |
|---|---|---|
| Smart Contract (Chitragupt.sol) | ✅ Complete | Fully functional, tested, deployable |
| Deployment Script | ✅ Complete | Polygon Amoy configured |
| Contract Test Suite | ✅ Complete | 13 tests, all core flows covered |
| Landing Page | ✅ Complete | Full hero, features, process, terminology, CTA |
| About Page | ✅ Complete | Manifesto, lore, mechanics, dark CTA |
| Features Page | ✅ Complete | Technical feature cards |
| Shabd Kosh (Documentation) | ✅ Complete | Full protocol docs with sticky TOC |
| Submit Page (UI) | ✅ Complete | File upload, guardian config, encryption overlay |
| Dashboard Page (UI) | ✅ Complete | Vault list, dead man switch button |
| Guardian Page (UI) | ✅ Complete | Triggered/sealed vault cards, shard submission |
| Verify Page (UI) | ✅ Complete | SHA-256 drop-zone + hash comparison |
| Crypto Engine (AES + SSS) | ✅ Complete | Full encrypt/decrypt/split/reconstruct pipeline |
| Crypto Sandbox (`/cryptotest`) | ✅ Complete | End-to-end manual testing page |
| Navbar | ✅ Complete | Scroll-aware, responsive, dropdown portals |
| Footer | ✅ Complete | Terminal-inspired, brutalist design |
| Design System (CSS) | ✅ Complete | Neo-brutalist tokens, components, animations |

### 16.2 What's NOT Built Yet ❌

| Component | Status | Blocker |
|---|---|---|
| **Wallet Connection (MetaMask/WalletConnect)** | ❌ Not started | Requires ethers.js integration |
| **On-chain Transaction Signing** | ❌ Not started | Dependent on wallet connection |
| **IPFS Upload Integration** | ❌ Not started | Requires Web3.Storage API token |
| **Arweave Upload Integration** | ❌ Not started | Requires Arweave wallet + AR tokens |
| **Live Contract Read/Write** | ❌ Not started | Pages use mock/simulated data |
| **Chainlink Keeper Registration** | ❌ Not started | Requires deployed contract + LINK token |
| **Push Protocol Notifications** | ❌ Not started | Phase 2 feature |
| **The Graph Subgraph** | ❌ Not started | Phase 4 feature |
| **Gasless Meta-Transactions** | ❌ Not started | Phase 4 feature |
| **Tor Hidden Service** | ❌ Not started | Phase 4 feature |
| **ZK Identity (zk-SNARKs)** | ❌ Not started | Phase 5 feature |
| **Cross-Chain Expansion** | ❌ Not started | Phase 5 feature |

### 16.3 Known Issues

| Issue | Severity | Description |
|---|---|---|
| Submit page uses simulated encryption | Medium | `processEncryption()` uses `setTimeout` + `secrets.str2hex` instead of the real `secureEvidence()` pipeline |
| Dashboard/Guardian use mock data | Medium | Pages render hardcoded vault objects instead of reading from blockchain |
| No wallet connection UI | High | No MetaMask/WalletConnect integration exists |
| Shabd Kosh `sections` dependency warning | Low | `useEffect` dependency array includes `sections` (should be `useMemo`'d) |
| Features page hover color not applied | Low | Dynamic Tailwind class `hover:${color}` may not generate at build time |
| No responsive testing documented | Low | Neo-brutalist layout tested manually; no formal device matrix |

---

## 17. Future Development Phases

### Phase 1: Core Architecture Validation (Q2 2026) — **CURRENT**
- [x] Smart contract design & deployment
- [x] Frontend scaffolding (Next.js 16 App Router)
- [x] Neo-Brutalist design system
- [x] Client-side AES-256-GCM encryption
- [x] Shamir's Secret Sharing integration
- [x] Core pages (Submit, Dashboard, Guardian, Verify)
- [ ] Wallet connection (MetaMask / WalletConnect)
- [ ] Live contract interaction from frontend
- [ ] IPFS upload via Web3.Storage

### Phase 2: Platform Hardening & Integration (Q3 2026)
- [ ] Arweave integration (redundant storage)
- [ ] Chainlink Keeper registration (Dead Man's Switch automation)
- [ ] Large file chunking for web3 upload
- [ ] Guardian dashboard with live shard management
- [ ] Push Protocol notifications for guardians
- [ ] Performance optimization & bundle analysis

### Phase 3: Security Auditing & Hardening (Q4 2026)
- [ ] Third-party smart contract audit (Trail of Bits / OpenZeppelin)
- [ ] Client-side crypto review
- [ ] Penetration testing
- [ ] Memory leak analysis for plaintext remnants
- [ ] Browser state sanitization audit
- [ ] Immunefi bug bounty launch
- [ ] IPFS-hosted frontend (ENS + Fleek)

### Phase 4: Mainnet Production Launch (Q1 2027)
- [ ] Polygon PoS / zkEVM mainnet deployment
- [ ] The Graph subgraph deployment
- [ ] Tor hidden service (`.onion`)
- [ ] Nym Mixnet for RPC call anonymization
- [ ] Gasless meta-transactions (Biconomy / Gelato)
- [ ] Journalist partnership onboarding
- [ ] Public sandbox environment

### Phase 5: Protocol Expansion (Q2–Q3 2027)
- [ ] Zero-Knowledge credentials (zk-SNARKs/STARKs)
- [ ] Satyavadi credibility scoring
- [ ] Cross-chain deployment (Ethereum, Arbitrum, Optimism) via CCIP
- [ ] Decentralized governance (Satyavadi Council + Safe multisig)

### Phase 6: Enterprise Standardization (Q4 2027+)
- [ ] Corporate whistleblower API / white-label SDK
- [ ] EU Whistleblower Directive compliance layer
- [ ] Sarbanes-Oxley (SOX) compliance adapter
- [ ] TEE integration (Intel SGX / AWS Nitro)
- [ ] Custom Layer-3 application chain for permanent storage incentives

---

## 18. Glossary — Sanskrit Lexicon

The Chitragupt protocol uses Sanskrit-derived terminology to reflect its thematic foundation as an immutable record of truth.

| English Term | Sanskrit | Devanagari | Technical Mapping |
|---|---|---|---|
| Whistleblower | **Satyavadi** | सत्यवादी | `msg.sender` who creates a Lekhaa |
| Vault / Record | **Lekhaa** | लेखा | `struct Lekhaa` in smart contract |
| Evidence | **Saakshya** | साक्ष्य | Encrypted file payload (IPFS + Arweave) |
| Guardian | **Yamadoot** | यमदूत | Wallet addresses holding key shards |
| Dead Man's Switch | **Antim Sanket** | अंतिम संकेत | Check-in timer expiry trigger |
| Public Release | **Prakash** | प्रकाश | Vault state `released = true` |
| Check-In | **Jeevan Sanket** | जीवन संकेत | Timer reset via `checkin()` function |
| Encryption Shield | **Kavach Suraksha** | कवच सुरक्षा | AES-256-GCM encryption layer |
| Key Splitting | **Kunji Vibhajan** | कुंजी विभाजन | Shamir's Secret Sharing operation |
| Permanent Store | **Nitya Bhandaar** | नित्य भंडार | IPFS + Arweave storage layer |
| Verified Proof | **Satyanisht Pramaan** | सत्यनिष्ठ प्रमाण | On-chain SHA-256 hash verification |

---

## 19. Contributing Guidelines

### How to Contribute

1. **Fork** the repository from [github.com/zynorex/chitragupt](https://github.com/zynorex/chitragupt)
2. **Clone** your fork and install dependencies:
   ```bash
   git clone https://github.com/<your-username>/chitragupt.git
   cd chitragupt
   npm install
   cd frontend && npm install
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** following the code conventions in Section 15.3
5. **Run tests:**
   ```bash
   npx hardhat test
   cd frontend && npm run lint
   ```
6. **Submit a Pull Request** with:
   - Clear description of changes
   - Test coverage for new logic
   - Screenshots for UI changes
   - Security implications for crypto changes

### Priority Contribution Areas

| Area | Skill Required | Impact |
|---|---|---|
| Wallet connection integration | ethers.js / WalletConnect | 🔴 Critical |
| IPFS upload pipeline | Web3.Storage API | 🔴 Critical |
| Arweave integration | Arweave JS SDK | 🟡 High |
| Chainlink Keeper setup | Chainlink Automation | 🟡 High |
| Crypto library unit tests | TypeScript / Vitest | 🟡 High |
| E2E browser tests | Playwright | 🟢 Medium |
| Gas optimization | Solidity | 🟢 Medium |
| Accessibility audit | WCAG 2.1 | 🟢 Medium |
| Internationalization | i18n | 🔵 Low |

---

## 20. License & Legal

### License

This project is licensed under the **MIT License**.

### Ethical Disclaimer

Chitragupt is designed to protect truth-tellers from retaliation and censorship. The developers do not endorse the use of this platform for:

- Sharing classified military secrets that endanger active operations
- Distributing non-consensual intimate content
- Facilitating extortion or blackmail
- Any activity that violates international humanitarian law

**The platform is a tool for accountability. Use it responsibly.**

### Regulatory Awareness

The project is being developed with awareness of:
- **EU Whistleblower Protection Directive (2019/1937)** — Legal framework for corporate and governmental whistleblowing
- **US Sarbanes-Oxley Act (SOX)** — Corporate whistleblower protections
- **UK Public Interest Disclosure Act 1998** — Whistleblower employment protections

Future enterprise features (Phase 6) will include compliance adapters for these frameworks.

---

> **"सत्यम् एव जयते"** — *Truth alone triumphs.*

---

*This document is a living reference. It will be updated as the protocol evolves through its development phases.*
