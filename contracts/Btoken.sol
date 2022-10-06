//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Btoken is ERC20 {
    constructor() ERC20('BTK', "Btoken") {
        _mint(msg.sender, 125000 * 10 ** 18);
    }
    //0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
    function mint(address to, uint256 amount) public {
        _mint(to, amount * 10 ** 18);
    }

}