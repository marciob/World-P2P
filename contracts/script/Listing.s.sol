// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Trader} from "../src/Trader.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TraderScript is Script {
    Trader public trader;
    address public seller = address(0x4A025a196C06eE76821E049eB25C098cd4D326Ca);
    address public token = address(0xA0C794A7896285c893385B18E8BaF4F0eB87C836);

    function setUp() public {
        trader = Trader(payable(0xFb5b8a51d1E3A084805bc4FF3Ed112AFeC01F2b3));
    }

    function run() public {
        vm.startBroadcast();
        console.log("seller balance", IERC20(token).balanceOf(seller));
        // vm.startPrank(seller);
        IERC20(token).approve(address(trader), type(uint256).max);
        // trader.list("test", address(token), 1, 100);
        console.log("seller balance", IERC20(token).balanceOf(seller));
        console.log("trader balance", IERC20(token).balanceOf(address(trader)));
        // vm.stopPrank();
        vm.stopBroadcast();
    }
}


