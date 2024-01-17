// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {IGhoToken} from "https://github.com/aave/gho-core/blob/main/src/contracts/gho/interfaces/IGhoToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract lfgho is IGhoToken, ERC20 {
    address public admin;
    string value1="This function is not in use";
    bytes32 value2="This function is not in use";
    uint256 a=1;
    uint256 b=1;
    address[2] arr=["0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000"];

    constructor() ERC20("Gho Token", "GHO") {
        admin = msg.sender;
    }

    mapping(address => Facilitator) internal _facilitators;

    function mint(address account, uint256 amount) external  {
        require(amount > 0, "INVALID_MINT_AMOUNT");

      

        _mint(account, amount);
    }

    function addFacilitator(  address facilitatorAddress,string calldata facilitatorLabel,uint128 bucketCapacity) external  {
        value1="This function is not in use";
    }

     function FACILITATOR_MANAGER_ROLE() external pure returns (bytes32){
        return "This function is not in use";
     }


  function BUCKET_MANAGER_ROLE() external pure returns (bytes32){
            return "This function is not in use";
  }

    function burn(uint256 amount) external{
        value1="This function is not in use";
    }

      function removeFacilitator(address facilitatorAddress) external{
                value1="This function is not in use";

      }

  
  function setFacilitatorBucketCapacity(address facilitator, uint128 newCapacity) external{
            value1="This function is not in use";
  }

  
  function getFacilitator(address facilitator) external view returns (Facilitator memory){
    return Facilitator;
  }

 
  function getFacilitatorBucket(address facilitator) external view returns (uint256, uint256){
    return(a,b);
  }

  function getFacilitatorsList() external view returns (address[] memory){
    return arr;
  }

}
