// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {IGhoToken} from "https://github.com/aave/gho-core/blob/main/src/contracts/gho/interfaces/IGhoToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract lfgho is IGhoToken, ERC20 {
    address public admin;

    constructor() ERC20("Gho Token", "GHO", 18) {
        admin = msg.sender;
    }

    mapping(address => Facilitator) internal _facilitators;

    function mint(address account, uint256 amount) external {
        require(amount > 0, "INVALID_MINT_AMOUNT");

        uint256 currentBucketLevel = _facilitators[msg.sender].bucketLevel;
        uint256 newBucketLevel = currentBucketLevel + amount;
        require(
            f.bucketCapacity >= newBucketLevel,
            "FACILITATOR_BUCKET_CAPACITY_EXCEEDED"
        );
        f.bucketLevel = uint128(newBucketLevel);

        _mint(account, amount);
    }

    function addFacilitator(address facilitatorAddress, string memory facilitatorLabel,uint128 bucketCapacity) external {

    }
}
