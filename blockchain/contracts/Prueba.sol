// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Prueba {
  uint8 baseValue;

  function set(uint8 number) public {
    baseValue = number;
  }

  function get() public view returns(uint8){
    return baseValue;
  }
}
