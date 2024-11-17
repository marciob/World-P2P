// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Trader} from "../src/Trader.sol";

contract TraderScript is Script {
    Trader public trader;
    address public seller = address(1);
    address public buyer = address(2);

    function setUp() public {
        trader = new Trader();
        vm.deal(address(seller), 1000 ether);
    }

    function run() public {
        // vm.startBroadcast();
        vm.prank(seller);
        trader.list{value: 100 ether}("test", address(0), 100 ether, 100);
        console.log("seller balance", address(seller).balance);
        console.log("trader balance", address(trader).balance);
        console.log("buyer balance", address(buyer).balance);
        // change msg.sender to a different address

        // buyer
        vm.prank(buyer);
        uint256 orderIndex = trader.initiateOrder(0, address(0), 10 ether);
        console.log("orderIndex", orderIndex);

        vm.prank(seller);
        trader.acceptOrderAsSeller(orderIndex);

        vm.prank(buyer);
        // chatting and setting fiat offchain
        trader.approvePaymentAsBuyer(orderIndex);
        console.log("seller balance", address(seller).balance);

        // seller
        vm.prank(seller);
        trader.fulfillOrder(orderIndex);
        console.log("seller balance", address(seller).balance);
        console.log("trader balance", address(trader).balance);
        console.log("buyer balance", address(buyer).balance);

        // vm.stopBroadcast();
    }
}

