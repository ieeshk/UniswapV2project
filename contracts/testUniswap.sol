// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IUniswapV2Router.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TestUniswapLiquidity {
    //Factory deployed at: https://testnet.bscscan.com/address/0xf1215b0dCc50DE9Dc61407A5d3d585d1886f0850#contracts
    address private constant FACTORY = 0xf1215b0dCc50DE9Dc61407A5d3d585d1886f0850;
    //Router deployed at: https://testnet.bscscan.com/address/0x5510E03Da1E6CdE8aB0c0B35cF217AdCaa7f19B2#code
    address private constant ROUTER = 0x5510E03Da1E6CdE8aB0c0B35cF217AdCaa7f19B2;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint _amountA,
        uint _amountB
    ) external {
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

        IERC20(_tokenA).approve(ROUTER, _amountA);
        IERC20(_tokenB).approve(ROUTER, _amountB);

        if (IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB) == address(0)) {            
            address tokenPair = IUniswapV2Factory(FACTORY).createPair(_tokenA, _tokenB);
        }

        (uint amountA, uint amountB, uint liquidity) = IUniswapV2Router(ROUTER)
            .addLiquidity(
                _tokenA,
                _tokenB,
                _amountA,
                _amountB,
                1,
                1,
                address(this),
                block.timestamp
            );
    }

    function removeLiquidity(address _tokenA, address _tokenB) external {
        address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);

        uint liquidity = IERC20(pair).balanceOf(address(this));
        IERC20(pair).approve(ROUTER, liquidity);

        (uint amountA, uint amountB) = IUniswapV2Router(ROUTER).removeLiquidity(
            _tokenA,
            _tokenB,
            liquidity,
            1,
            1,
            address(this),
            block.timestamp
        );
    }
}