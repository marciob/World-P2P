// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Trader} from "../src/Trader.sol";

contract TraderTest is Test {
    Trader public trader;
    address public seller = address(1);
    address public buyer = address(2);

    function setUp() public {
        trader = new Trader();
        vm.deal(address(seller), 1000 ether);
    }

    function test_Buy() public {
        vm.prank(seller);
        trader.list{value: 100 ether}("test", address(0), 100 ether, 100);
        // change msg.sender to a different address

        // buyer
        vm.prank(buyer);
        uint256 orderIndex = trader.initiateOrder(0, address(0), 10 ether);

        // chatting and setting fiat offchain
        // trader.approveOrder(orderIndex);
        // console.log("seller balance", address(seller).balance);

        // seller
        vm.prank(seller);
        trader.fulfillOrder(orderIndex);
    }
}
