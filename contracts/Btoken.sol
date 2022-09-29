//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Btoken is ERC20 {
    constructor() ERC20('BTK', "Btoken") {
        _mint(msg.sender, 2500 * 10 ** 18);
    }

}