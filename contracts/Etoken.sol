//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Etoken is ERC20 {
    constructor() ERC20('ETK', "Etoken") {
        _mint(msg.sender, 2500 * 10 ** 18);
    }

}