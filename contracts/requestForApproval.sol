// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

contract RequestForApproval {
    address public organizationOwner;
    bool public response;

    constructor(address _owner) public {
    require(_owner != address(0), "Invalid organization owner address");
    organizationOwner = _owner;
}

    function signApproval(bool _response) external {
        response = _response;
    }
}
