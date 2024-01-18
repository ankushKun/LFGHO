// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {IGhoToken} from "./IGhoToken.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract lfgho is IGhoToken, ERC20, AccessControl {
    address public admin;
    uint256 num;

    struct MyFacilitator {
        uint256 bucketCapacity;
        uint256 bucketLevel;
        string label;
        uint256 count;
        address addrs;
    }
    mapping(address => MyFacilitator) internal myFacilitators;

    constructor() ERC20("Gho Token", "GHO") {
        admin = msg.sender;
    }

    function mint(address account, uint256 amount) external {
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
        myFacilitators[account].count++;
    }

    function burn(uint256 amount) external {
        value1 = "This function is not in use";
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
