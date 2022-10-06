// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract TestUniswapLiquidity {
    //Factory deployed at: https://goerli.etherscan.io/address/0xF7e98F62886872929601381EAB1Fb7bcC277456D#code
     //address private constant FACTORY = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
    // //Router deployed at: https://goerli.etherscan.io/address/0x3e6e77EB06D2cdFE42Ad2A54a784d4E324b3923C#code
    // address private constant ROUTER = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0;
     //address private constant WETH = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512;

     address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
     address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
     address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;


    event Log(string message, uint val);

    receive() external payable {}

    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) external {
        require(_tokenA != address(0), "Not a valid token address");
        require(_tokenB != address(0), "Not a valid token address");
        require(_amountA > 0, "Enter a positive token amount");
        require(_amountB > 0, "Enter a positive token amount");
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

        IERC20(_tokenA).approve(ROUTER, _amountA);
        IERC20(_tokenB).approve(ROUTER, _amountB);


        (uint256 amountA, uint256 amountB, uint256 liquidity) = IUniswapV2Router(ROUTER)
            .addLiquidity(
                _tokenA,
                _tokenB,
                _amountA,
                _amountB,
                1,
                1,
                address(this),
                block.timestamp + 500
            );

        emit Log("amountA", amountA);
        emit Log("amountB", amountB);
        emit Log("liquidity", liquidity);
    }
    function addLiquidityEth(address _tokenA, uint256 _amountA) external payable {
        require(_tokenA != address(0), "Not a valid address");
        require(_amountA > 0, "Enter a positive token Amount");
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenA).approve(ROUTER, _amountA);
        (uint256 amountA, uint256 amountETH, uint256 liquidity) = IUniswapV2Router(ROUTER)
        .addLiquidityETH{value: msg.value}(
            _tokenA,
            _amountA,
            1,
            msg.value,
            address(this),
            block.timestamp + 500

        );

    }

    function removeLiquidity(address _tokenA, address _tokenB) external {
        require(_tokenA != address(0), "Not a valid token Address");
        require(_tokenB != address(0), "Not a valid token Address");
        address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);
        console.log("the pair address is", pair);

        uint liquidity = IERC20(pair).balanceOf(address(this));
        IERC20(pair).approve(ROUTER, liquidity);

        (uint256 amountA, uint256 amountB) = IUniswapV2Router(ROUTER).removeLiquidity(
            _tokenA,
            _tokenB,
            liquidity,
            1,
            1,
            address(this),
            block.timestamp
        );
        emit Log("amountA", amountA);
        emit Log("amountB", amountB);
    }

    function removeLiquidityETH(address _tokenA) external {
        require(_tokenA != address(0), "Not a valid token Address");
        address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, WETH);

        uint liquidity = IERC20(pair).balanceOf(address(this));
        IERC20(pair).approve(ROUTER, liquidity);

        (uint256 amountToken, uint256 amountETH) = IUniswapV2Router(ROUTER).removeLiquidityETH(
            _tokenA,
            liquidity,
            1,
            1,
            address(this),
            block.timestamp
        );

    }

    function swapTokentoToken(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin
    ) external {
        require(_tokenIn != address(0), "Enter a valid token Address");
        require(_tokenOut != address(0), "Enter a valid token Address");
        require(_amountIn > 0, "Enter a positive token amount");
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(ROUTER, _amountIn);
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;

        IUniswapV2Router(ROUTER).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            address(this),
            block.timestamp + 300
        );
    }

    function swapexactETHforToken(address _token, uint256 _amountOutMin) external payable {
        require(_token != address(0), "Enter a valid token Address");
        require(msg.value >0, "infsufficient eth value");
        address[] memory path;
        path = new address[](2);
        path[0] = WETH;
        path[1] = _token;
        // uint256 amountOutMin;
        // if(_amountOutMin <=0) {
        //     amountOutMin = IUniswapV2Router(ROUTER).getAmountsOut(_amountIn, path)[1];
        // }else {
        //     amountOutMin = _amountOutMin;
        // }

        IUniswapV2Router(ROUTER).swapExactETHForTokens{value:msg.value}(
            _amountOutMin,
            path,
            address(this),
            block.timestamp + 300
        );

    }

    function swapTokenforETH(address _tokenIn, uint256 _amountIn, uint256 _amountOutMin) external payable {
        require(_tokenIn != address(0), "Enter a valid token Address");
        require(_amountIn > 0, "Enter a positive token Amount");

        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(ROUTER, _amountIn);
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenIn;
        path[1] = WETH;

        IUniswapV2Router(ROUTER).swapExactTokensForETH(
            _amountIn,
            _amountOutMin,
            path,
            address(this),
            block.timestamp + 300
        );


    }
}