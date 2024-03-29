// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {IGhoToken} from "./IGhoToken.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract lfgho is IGhoToken, ERC20, AccessControl {
    using EnumerableSet for EnumerableSet.AddressSet;

    struct MyFacilitator {
        uint256 bucketCapacity;
        uint256 bucketLevel;
        string label;
        uint256 count;
        uint256 value;
        address addrs;
    }
    mapping(address => MyFacilitator) internal myFacilitators;

    // EnumerableSet.AddressSet public mySet;

    mapping(address => EnumerableSet.AddressSet) private vouchSet;

    constructor() ERC20("Gho Token", "GHO") {}

    function mint(address account, uint256 amount) external {
        require(balanceOf(account) == 0, "You are already DAO MEMBER");
        require(amount > 0, "INVALID_MINT_AMOUNT");
        myFacilitators[account].bucketCapacity = 1;
        require(
            amount <= myFacilitators[account].bucketCapacity,
            "Amount generating is exceeding the capacity, shoud be only 1"
        );
        myFacilitators[account].bucketLevel = amount;
        myFacilitators[account].addrs = account;
        myFacilitators[account].label = "DAO MEMBER";
        _mint(account, 1);
    }

    function vouch(address account) public {
        require(
            myFacilitators[msg.sender].bucketLevel == 1,
            "You are not a valid facilitator"
        );
        require(
            vouchSet[account].contains(msg.sender) == false,
            "You already vouch for this address"
        ); // Only one time you can vouch for an address

        myFacilitators[account].count++;
        vouchSet[account].add(msg.sender);
        if (
            myFacilitators[msg.sender].count >= 0 &&
            myFacilitators[msg.sender].count < 10
        ) {
            myFacilitators[account].value++;
        } else if (
            myFacilitators[msg.sender].count >= 10 &&
            myFacilitators[msg.sender].count < 100
        ) {
            myFacilitators[account].value = myFacilitators[account].value + 2;
        } else if (
            myFacilitators[msg.sender].count >= 100 &&
            myFacilitators[msg.sender].count < 500
        ) {
            myFacilitators[account].value = myFacilitators[account].value + 3;
        } else if (
            myFacilitators[msg.sender].count >= 500 &&
            myFacilitators[msg.sender].count < 1000
        ) {
            myFacilitators[account].value = myFacilitators[account].value + 4;
        } else if (
            myFacilitators[msg.sender].count >= 1000 &&
            myFacilitators[msg.sender].count < 10000
        ) {
            myFacilitators[account].value = myFacilitators[account].value + 5;
        }
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function getAllVouch(
        address account
    ) public view returns (address[] memory) {
        return vouchSet[account].values();
    }

    function getDetails(
        address account
    ) public view returns (MyFacilitator memory) {
        return myFacilitators[account];
    }

    ///////////////// USELESS FUNCTION //////////////////////////////  NO NEED TO FOCUS ON THESE /////////////////////////////////////

    string value1 = "This function is not in use";
    bytes32 value2 = "This function is not in use";
    uint256 a = 1;
    uint256 b = 1;
    address[] arr;

    mapping(address => Facilitator) internal _facilitators;

    function addFacilitator(
        address facilitatorAddress,
        string calldata facilitatorLabel,
        uint128 bucketCapacity
    ) external {
        value1 = "This function is not in use";
    }

    function FACILITATOR_MANAGER_ROLE() external pure returns (bytes32) {
        return "This function is not in use";
    }

    function BUCKET_MANAGER_ROLE() external pure returns (bytes32) {
        return "This function is not in use";
    }

    function removeFacilitator(address facilitatorAddress) external {
        value1 = "This function is not in use";
    }

    function setFacilitatorBucketCapacity(
        address facilitator,
        uint128 newCapacity
    ) external {
        value1 = "This function is not in use";
    }

    function getFacilitator(
        address facilitator
    ) external view returns (Facilitator memory) {
        return _facilitators[facilitator];
    }

    function getFacilitatorBucket(
        address facilitator
    ) external view returns (uint256, uint256) {
        return (a, b);
    }

    function getFacilitatorsList() external view returns (address[] memory) {
        return arr;
    }
}
