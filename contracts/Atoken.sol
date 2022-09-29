//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Atoken is ERC20 {
    constructor() ERC20('ATK', "Atoken") {
        _mint(msg.sender, 2500 * 10 ** 18);
    }

}