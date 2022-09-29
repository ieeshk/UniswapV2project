//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ctoken is ERC20 {
    constructor() ERC20('CTK', "Ctoken") {
        _mint(msg.sender, 2500 * 10 ** 18);
    }

}