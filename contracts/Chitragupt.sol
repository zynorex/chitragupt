// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Chitragupt Whistleblower Vault
 * @dev A decentralized, censorship-proof vault using a dead man's switch for releasing encrypted evidence.
 */
contract Chitragupt {
    struct Lekhaa {
        bytes32 evidenceHash;      // SHA-256 of original evidence (Saakshya)
        string ipfsCID;            // Encrypted evidence on IPFS
        string arweaveTxId;        // Encrypted evidence on Arweave
        address[] guardians;       // Guardian wallet addresses (Yamadoots)
        uint256 totalShards;       // N (total number of shards)
        uint256 threshold;         // K (minimum shards needed to reconstruct)
        uint256 lastCheckin;       // Last check-in timestamp
        uint256 checkinInterval;   // How often whistleblower must check in
        bool released;             // Whether vault has been released (Prakash)
        uint256 shardsSubmitted;   // How many shards submitted so far
    }

    uint256 public nextVaultId;
    mapping(uint256 => Lekhaa) public vaults;
    
    // Mapping of Satyavadi (whistleblower) address per vault for check-in auth
    mapping(uint256 => address) public satyavadiOf;
    
    // Map a guardian (Yamadoot) to the vaults they guard
    mapping(address => uint256[]) public guardianVaults;
    
    // Track if a guardian has submitted their shard for a vault
    mapping(uint256 => mapping(address => bool)) public hasSubmittedShard;

    // Events
    event LekhaaCreated(uint256 indexed vaultId, address indexed satyavadi, uint256 checkinInterval);
    event CheckedIn(uint256 indexed vaultId, uint256 timestamp);
    event AntimSanketTriggered(uint256 indexed vaultId);
    event ShardSubmitted(uint256 indexed vaultId, address indexed yamadoot, string shard, uint256 totalSubmitted);
    event PrakashReleased(uint256 indexed vaultId);

    modifier onlyUnreleased(uint256 _vaultId) {
        require(!vaults[_vaultId].released, "Lekhaa is already released (Prakash)");
        _;
    }

    modifier validVault(uint256 _vaultId) {
        require(_vaultId < nextVaultId, "Invalid Lekhaa ID");
        _;
    }

    /**
     * @notice Whistleblower creates a record, sets guardians, and check-in interval
     * @param _evidenceHash SHA-256 of original evidence
     * @param _ipfsCID Encrypted evidence on IPFS
     * @param _arweaveTxId Encrypted evidence on Arweave
     * @param _guardians Array of guardian wallet addresses
     * @param _threshold Minimum shards required (K)
     * @param _checkinInterval Time in seconds before dead man's switch triggers
     * @return vaultId Newly created vault ID
     */
    function createLekhaa(
        bytes32 _evidenceHash,
        string calldata _ipfsCID,
        string calldata _arweaveTxId,
        address[] calldata _guardians,
        uint256 _threshold,
        uint256 _checkinInterval
    ) external returns (uint256) {
        require(_guardians.length > 0, "Requires at least 1 Yamadoot");
        require(_threshold > 0 && _threshold <= _guardians.length, "Invalid threshold");
        require(_checkinInterval > 0, "Interval must be > 0");

        uint256 vaultId = nextVaultId++;
        
        Lekhaa storage newVault = vaults[vaultId];
        newVault.evidenceHash = _evidenceHash;
        newVault.ipfsCID = _ipfsCID;
        newVault.arweaveTxId = _arweaveTxId;
        newVault.guardians = _guardians;
        newVault.totalShards = _guardians.length;
        newVault.threshold = _threshold;
        newVault.lastCheckin = block.timestamp;
        newVault.checkinInterval = _checkinInterval;
        newVault.released = false;
        newVault.shardsSubmitted = 0;

        satyavadiOf[vaultId] = msg.sender;

        for (uint256 i = 0; i < _guardians.length; i++) {
            guardianVaults[_guardians[i]].push(vaultId);
        }

        emit LekhaaCreated(vaultId, msg.sender, _checkinInterval);
        return vaultId;
    }

    /**
     * @notice Whistleblower checks in to reset timer
     * @param _vaultId ID of the vault
     */
    function checkin(uint256 _vaultId) external validVault(_vaultId) onlyUnreleased(_vaultId) {
        require(msg.sender == satyavadiOf[_vaultId], "Only Satyavadi can check in");
        
        vaults[_vaultId].lastCheckin = block.timestamp;
        emit CheckedIn(_vaultId, block.timestamp);
    }

    /**
     * @notice Check if the dead man's switch has triggered
     * @param _vaultId ID of the vault
     * @return bool True if triggered
     */
    function isTriggered(uint256 _vaultId) public view validVault(_vaultId) returns (bool) {
        return (block.timestamp > vaults[_vaultId].lastCheckin + vaults[_vaultId].checkinInterval);
    }

    /**
     * @notice Called to trigger release if timer expired (Antim Sanket)
     * @param _vaultId ID of the vault to trigger
     */
    function triggerRelease(uint256 _vaultId) external validVault(_vaultId) onlyUnreleased(_vaultId) {
        require(isTriggered(_vaultId), "Antim Sanket not yet triggered");
        // Emitting the trigger tells Guardians to submit their shards
        emit AntimSanketTriggered(_vaultId);
    }

    /**
     * @notice Guardian submits their shard when triggered
     * @param _vaultId ID of the vault
     * @param _shard The encrypted shard belonging to this Guardian
     */
    function submitShard(uint256 _vaultId, string calldata _shard) external validVault(_vaultId) onlyUnreleased(_vaultId) {
        Lekhaa storage vault = vaults[_vaultId];
        
        require(isTriggered(_vaultId), "Antim Sanket not triggered yet");
        require(!hasSubmittedShard[_vaultId][msg.sender], "Yamadoot already submitted shard");
        
        bool isGuardian = false;
        for (uint256 i = 0; i < vault.guardians.length; i++) {
            if (vault.guardians[i] == msg.sender) {
                isGuardian = true;
                break;
            }
        }
        require(isGuardian, "Caller is not a Yamadoot for this Lekhaa");

        hasSubmittedShard[_vaultId][msg.sender] = true;
        vault.shardsSubmitted++;

        emit ShardSubmitted(_vaultId, msg.sender, _shard, vault.shardsSubmitted);

        if (vault.shardsSubmitted >= vault.threshold && !vault.released) {
            vault.released = true;
            emit PrakashReleased(_vaultId);
        }
    }

    /**
     * @notice Returns record details
     * @param _vaultId ID of the vault
     */
    function getLekhaa(uint256 _vaultId) external view validVault(_vaultId) returns (
        bytes32 evidenceHash,
        string memory ipfsCID,
        string memory arweaveTxId,
        address[] memory guardians,
        uint256 totalShards,
        uint256 threshold,
        uint256 lastCheckin,
        uint256 checkinInterval,
        bool released,
        uint256 shardsSubmitted
    ) {
        Lekhaa storage vault = vaults[_vaultId];
        return (
            vault.evidenceHash,
            vault.ipfsCID,
            vault.arweaveTxId,
            vault.guardians,
            vault.totalShards,
            vault.threshold,
            vault.lastCheckin,
            vault.checkinInterval,
            vault.released,
            vault.shardsSubmitted
        );
    }

    /**
     * @notice Checks submitted hash against stored hash
     * @param _vaultId ID of the vault
     * @param _hash The hash to verify
     * @return bool True if the hash matches the original saakshya (evidence)
     */
    function verifyEvidence(uint256 _vaultId, bytes32 _hash) external view validVault(_vaultId) returns (bool) {
        return vaults[_vaultId].evidenceHash == _hash;
    }
}
