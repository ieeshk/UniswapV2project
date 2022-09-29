//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dtoken is ERC20 {
    constructor() ERC20('DTK', "Dtoken") {
        _mint(msg.sender, 2500 * 10 ** 18);
    }

}