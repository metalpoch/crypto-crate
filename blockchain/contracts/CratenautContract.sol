// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18 <0.9.0;

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

    event ViewCratenaut(
        string alias_,
        uint8 plan,
        string img,
        uint256 planRenewal,
        uint256 updateAt,
        uint256 createAt
    );

    mapping(address => Cratenaut) public cratenauts;

    constructor() {
        contractOwner = payable(msg.sender);
        cratenauts[msg.sender] = Cratenaut(
            "root",
            1,
            "",
            0,
            block.timestamp,
            block.timestamp
        );
    }

    function dayToTimestamp(uint16 _day) internal pure returns (uint256) {
        return _day * 24 * 60 * 60;
    }

    function addCratenaut(string memory _alias_) public {
        require(
            cratenauts[msg.sender].plan > 1,
            "This address is already registered"
        );

        cratenauts[msg.sender] = Cratenaut(
            _alias_,
            2,
            "",
            0,
            block.timestamp,
            block.timestamp
        );

        emit ViewCratenaut(
            _alias_,
            2,
            "",
            0,
            block.timestamp,
            block.timestamp
        );
    }

    function updateImg(string memory _url) public {
        require(cratenauts[msg.sender].plan > 0, "Address not registered");
        cratenauts[msg.sender].img = _url;

        emit ViewCratenaut(
            cratenauts[msg.sender].alias_,
            cratenauts[msg.sender].plan,
            cratenauts[msg.sender].img,
            cratenauts[msg.sender].planRenewal,
            cratenauts[msg.sender].updateAt,
            cratenauts[msg.sender].createAt
        );
    }

    function updatePlan(uint8 _plan) public payable {
        require(cratenauts[msg.sender].plan > 1, "Address not registered");
        uint8 newPlan;
        uint256 planRenewal;
        uint256 amount;
        // plan 1 -> admin
        // plan 2 -> free
        if (_plan == 3) {
            amount = 12 * 10 ** 18;
            newPlan = 2;
            planRenewal = block.timestamp + dayToTimestamp(30); // now + 30 days
        } else if (_plan == 4) {
            amount = 60 * 10 ** 18;
            newPlan = 3;
            planRenewal = block.timestamp + dayToTimestamp(180); // now + 180 days
        } else if (_plan == 5) {
            amount = 100 * 10 ** 18;
            newPlan = 4;
            planRenewal = block.timestamp + dayToTimestamp(365); // now + 365 days
        }

        require(_plan > 0 && _plan <= 4, "Invalid plan");
        require(msg.value == amount, "Insufficient amount");

        contractOwner.transfer(msg.value);
        cratenauts[msg.sender].plan = newPlan;
        cratenauts[msg.sender].planRenewal = planRenewal;

        emit ViewCratenaut(
            cratenauts[msg.sender].alias_,
            cratenauts[msg.sender].plan,
            cratenauts[msg.sender].img,
            cratenauts[msg.sender].planRenewal,
            cratenauts[msg.sender].updateAt,
            cratenauts[msg.sender].createAt
        );
    }
}
