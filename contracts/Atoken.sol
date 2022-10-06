//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Atoken is ERC20 {
    constructor() ERC20('ATK', "Atoken") {
        _mint(msg.sender, 70000 * 10 ** 18);
    }
    //0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

    function mint(address to, uint256 amount) public {
        _mint(to, amount * 10 ** 18);
    }

}