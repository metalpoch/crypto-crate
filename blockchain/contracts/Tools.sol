// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19 <0.9.0;

library Tools {
    function stringComparator(string memory str1, string memory str2)
        public
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }

    function dayToTimestamp(uint16 _day) public pure returns (uint256) {
        return _day * 24 * 60 * 60;
    }
}

