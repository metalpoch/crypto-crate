// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19 <0.9.0;

import "./Tools.sol";

contract CratenautContract {
    address payable private contractOwner;

    struct Cratenaut {
        string alias_;
        uint8 plan;
        string img;
        uint256 planRenewal;
        uint256 updateAt;
        uint256 createAt;
    }

    mapping(address => Cratenaut) public cratenauts;

    constructor() {
        contractOwner = payable(msg.sender);
        cratenauts[msg.sender] = Cratenaut(
            "root",
            0,
            string(
                abi.encodePacked(
                    "https://robohash.org/",
                    msg.sender,
                    "?set=set3"
                )
            ),
            0,
            block.timestamp,
            block.timestamp
        );
    }

    function addCratenaut(string memory _alias_) public {
        cratenauts[msg.sender] = Cratenaut(
            _alias_,
            1,
            string(
                abi.encodePacked(
                    "https://robohash.org/",
                    msg.sender,
                    "?set=set3"
                )
            ),
            0,
            block.timestamp,
            block.timestamp
        );
    }

    function updateImg(string memory _url) public {
        cratenauts[msg.sender].img = _url;
    }

    function updatePlan(uint8 _plan) public payable {
        uint8 newPlan;
        uint256 planRenewal;
        uint256 amount;
        if (_plan == 2) {
            amount = 12 * 10**18;
            newPlan = 2;
            planRenewal = block.timestamp + Tools.dayToTimestamp(30); // now + 30 days
        } else if (_plan == 3) {
            amount = 60 * 10**18;
            newPlan = 3;
            planRenewal = block.timestamp + Tools.dayToTimestamp(180); // now + 180 days
        } else if (_plan == 4) {
            amount = 100 * 10**18;
            newPlan = 4;
            planRenewal = block.timestamp + Tools.dayToTimestamp(365); // now + 365 days
        }

        require(_plan > 0 && _plan <= 4, "Invalid plan");
        require(msg.value == amount, "Insufficient amount");
        
        contractOwner.transfer(msg.value);
        cratenauts[msg.sender].plan = newPlan;
        cratenauts[msg.sender].planRenewal = planRenewal;
    }
}

