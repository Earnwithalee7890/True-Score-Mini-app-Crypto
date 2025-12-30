// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CheckIn
 * @dev Daily check-in contract for TrueScore Mini App on Base
 * @author @aleekhoso
 * 
 * Deployed on Base Mainnet: 0xBD3aDb162D1C5c211075C75DFe3dCD14b549433A
 * 
 * Features:
 * - Daily check-ins with streak tracking
 * - Reputation building system
 * - Anti-spam fee (0.000001 ETH)
 * - Owner withdrawals
 */
contract CheckIn {
    // Struct to store user check-in data
    struct User {
        uint64 totalCheckIns;    // Total number of check-ins
        uint64 currentStreak;     // Current consecutive days
        uint64 lastCheckInDay;    // Last day user checked in
        uint256 reputation;       // Cumulative reputation score
    }

    // State variables
    mapping(address => User) public users;
    address public owner;
    uint256 public constant checkInFeeWei = 1_000_000_000_000; // 0.000001 ETH anti-spam fee
    uint256 public totalCheckIns;
    uint256 public totalUsers;

    // Events
    event CheckedIn(
        address indexed user,
        uint64 dayIndex,
        uint64 totalCheckIns,
        uint64 currentStreak,
        uint256 reputation
    );
    
    event FundsWithdrawn(address indexed owner, uint256 amount);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Get current day index (days since Unix epoch)
     */
    function getCurrentDay() public view returns (uint64) {
        return uint64(block.timestamp / 1 days);
    }

    /**
     * @dev Perform daily check-in
     * Requires exact fee payment to prevent spam
     */
    function checkIn() external payable {
        require(msg.value == checkInFeeWei, "Invalid fee");
        
        User storage user = users[msg.sender];
        uint64 currentDay = getCurrentDay();
        
        // Prevent multiple check-ins on the same day
        require(user.lastCheckInDay < currentDay, "Already checked in today");
        
        // Track new users
        if (user.totalCheckIns == 0) {
            totalUsers++;
        }
        
        // Calculate streak
        if (user.lastCheckInDay == currentDay - 1) {
            // Consecutive day - increment streak
            user.currentStreak++;
        } else if (user.lastCheckInDay < currentDay - 1) {
            // Streak broken - reset to 1
            user.currentStreak = 1;
        }
        
        // Update user data
        user.totalCheckIns++;
        user.lastCheckInDay = currentDay;
        
        // Calculate reputation boost (streak multiplier)
        uint256 reputationGain = 10 + (user.currentStreak * 5);
        user.reputation += reputationGain;
        
        totalCheckIns++;
        
        emit CheckedIn(
            msg.sender,
            currentDay,
            user.totalCheckIns,
            user.currentStreak,
            user.reputation
        );
    }

    /**
     * @dev Get user check-in stats
     */
    function getUserStats(address userAddress) 
        external 
        view 
        returns (
            uint64 totalCheckIns,
            uint64 currentStreak,
            uint64 lastCheckInDay,
            uint256 reputation,
            bool canCheckInToday
        ) 
    {
        User memory user = users[userAddress];
        uint64 currentDay = getCurrentDay();
        
        return (
            user.totalCheckIns,
            user.currentStreak,
            user.lastCheckInDay,
            user.reputation,
            user.lastCheckInDay < currentDay
        );
    }

    /**
     * @dev Get contract statistics
     */
    function getContractStats() 
        external 
        view 
        returns (
            uint256 _totalCheckIns,
            uint256 _totalUsers,
            uint256 _contractBalance
        ) 
    {
        return (
            totalCheckIns,
            totalUsers,
            address(this).balance
        );
    }

    /**
     * @dev Owner can withdraw collected fees
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(owner, balance);
    }

    /**
     * @dev Transfer ownership
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }

    /**
     * @dev Get contract version
     */
    function version() external pure returns (string memory) {
        return "1.0.0";
    }
}
