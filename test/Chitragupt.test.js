import { expect } from "chai";
import hre from "hardhat";
import helpers from "@nomicfoundation/hardhat-network-helpers";

const { ethers } = hre;
const { time } = helpers;

describe("Chitragupt Whistleblower Vault", function () {
  let chitragupt;
  let owner;
  let satyavadi;
  let yamadoots;
  let yamadoot1, yamadoot2, yamadoot3, yamadoot4, yamadoot5, random;
  
  const evidenceHash = ethers.keccak256(ethers.toUtf8Bytes("secret_evidence"));
  const ipfsCID = "QmTestCID";
  const arweaveTxId = "ArweaveTxId123";
  const threshold = 3;
  const checkinInterval = 3 * 24 * 60 * 60; // 72 hours

  beforeEach(async function () {
    [owner, satyavadi, yamadoot1, yamadoot2, yamadoot3, yamadoot4, yamadoot5, random] = await ethers.getSigners();
    yamadoots = [yamadoot1.address, yamadoot2.address, yamadoot3.address, yamadoot4.address, yamadoot5.address];

    const Chitragupt = await ethers.getContractFactory("Chitragupt");
    chitragupt = await Chitragupt.deploy();
    await chitragupt.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should start with nextVaultId = 0", async function () {
      expect(await chitragupt.nextVaultId()).to.equal(0);
    });
  });

  describe("createLekhaa", function () {
    it("Should create a new Lekhaa and emit event", async function () {
      await expect(chitragupt.connect(satyavadi).createLekhaa(
        evidenceHash,
        ipfsCID,
        arweaveTxId,
        yamadoots,
        threshold,
        checkinInterval
      )).to.emit(chitragupt, "LekhaaCreated")
        .withArgs(0, satyavadi.address, checkinInterval);

      expect(await chitragupt.nextVaultId()).to.equal(1);
      
      const vault = await chitragupt.getLekhaa(0);
      expect(vault.evidenceHash).to.equal(evidenceHash);
      expect(vault.totalShards).to.equal(5n);
      expect(vault.threshold).to.equal(3n);
    });
  });

  describe("checkin", function () {
    beforeEach(async function () {
      await chitragupt.connect(satyavadi).createLekhaa(evidenceHash, ipfsCID, arweaveTxId, yamadoots, threshold, checkinInterval);
    });

    it("Should update the lastCheckin time", async function () {
      const initialVault = await chitragupt.getLekhaa(0);
      
      await time.increase(100);
      
      await expect(chitragupt.connect(satyavadi).checkin(0))
        .to.emit(chitragupt, "CheckedIn");
        
      const finalVault = await chitragupt.getLekhaa(0);
      expect(finalVault.lastCheckin).to.be.gt(initialVault.lastCheckin);
    });

    it("Should revert if checkin called by someone other than Satyavadi", async function () {
      await expect(chitragupt.connect(random).checkin(0)).to.be.revertedWith("Only Satyavadi can check in");
    });
  });

  describe("Dead Man's Switch (Antim Sanket)", function () {
    beforeEach(async function () {
      await chitragupt.connect(satyavadi).createLekhaa(evidenceHash, ipfsCID, arweaveTxId, yamadoots, threshold, checkinInterval);
    });

    it("Should return false for isTriggered initially", async function () {
      expect(await chitragupt.isTriggered(0)).to.be.false;
    });

    it("Should not allow triggerRelease if timer not expired", async function () {
      await expect(chitragupt.triggerRelease(0)).to.be.revertedWith("Antim Sanket not yet triggered");
    });

    it("Should allow triggerRelease after interval", async function () {
      await time.increase(checkinInterval + 1);
      expect(await chitragupt.isTriggered(0)).to.be.true;
      await expect(chitragupt.triggerRelease(0)).to.emit(chitragupt, "AntimSanketTriggered").withArgs(0);
    });
  });

  describe("submitShard & release", function () {
    beforeEach(async function () {
      await chitragupt.connect(satyavadi).createLekhaa(evidenceHash, ipfsCID, arweaveTxId, yamadoots, threshold, checkinInterval);
      await time.increase(checkinInterval + 1);
      await chitragupt.triggerRelease(0);
    });

    it("Should allow Yamadoot to submit shard and emit event", async function () {
      await expect(chitragupt.connect(yamadoot1).submitShard(0, "shard1"))
        .to.emit(chitragupt, "ShardSubmitted")
        .withArgs(0, yamadoot1.address, "shard1", 1);
      
      const vault = await chitragupt.getLekhaa(0);
      expect(vault.shardsSubmitted).to.equal(1n);
    });

    it("Should revert if non-Yamadoot submits shard", async function () {
      await expect(chitragupt.connect(random).submitShard(0, "randomShard"))
        .to.be.revertedWith("Caller is not a Yamadoot for this Lekhaa");
    });

    it("Should trigger release (PrakashReleased) when threshold is reached", async function () {
      await chitragupt.connect(yamadoot1).submitShard(0, "shard1");
      await chitragupt.connect(yamadoot2).submitShard(0, "shard2");
      
      await expect(chitragupt.connect(yamadoot3).submitShard(0, "shard3"))
        .to.emit(chitragupt, "PrakashReleased")
        .withArgs(0);
        
      const vault = await chitragupt.getLekhaa(0);
      expect(vault.released).to.be.true;
    });

    it("Should prevent submission after release", async function () {
      await chitragupt.connect(yamadoot1).submitShard(0, "shard1");
      await chitragupt.connect(yamadoot2).submitShard(0, "shard2");
      await chitragupt.connect(yamadoot3).submitShard(0, "shard3"); // Triggers release

      await expect(chitragupt.connect(yamadoot4).submitShard(0, "shard4"))
        .to.be.revertedWith("Lekhaa is already released (Prakash)");
    });
  });

  describe("verifyEvidence", function () {
    beforeEach(async function () {
      await chitragupt.connect(satyavadi).createLekhaa(evidenceHash, ipfsCID, arweaveTxId, yamadoots, threshold, checkinInterval);
    });

    it("Should return true for original evidence hash", async function () {
      expect(await chitragupt.verifyEvidence(0, evidenceHash)).to.be.true;
    });

    it("Should return false for incorrect hash", async function () {
      const wrongHash = ethers.keccak256(ethers.toUtf8Bytes("wrong_evidence"));
      expect(await chitragupt.verifyEvidence(0, wrongHash)).to.be.false;
    });
  });
});
