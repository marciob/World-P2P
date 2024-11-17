// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Trader {
    
    struct Listing {
        uint256 index;
        string world_id;
        address seller;
        address asset;
        uint256 amount;
        uint256 price;
        bool isCancelled;
        bool isFulfilled;
        bool isActive;
    }

    struct Order {
        uint256 index;
        uint256 listingIndex;
        address buyer;
        address asset;
        uint256 amount;
        uint256 price;
        uint256 timestamp;
        bool isFulfilled;
        bool isBuyerPaymentApproved;
        bool isSellerAccepted;
        bool isCancelled;
        bool isDisputed;
    }

    Listing[] public listings;
    mapping(address => Listing[]) public sellerListings;
    Order[] public orders;
    mapping(address => uint256[]) public buyerOrders;
    mapping(address => uint256[]) public sellerOrders;

    function list(string memory _world_id, address _asset, uint256 _amount, uint256 _price) public payable returns (Listing memory) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_price > 0, "Price must be greater than 0");

        // transfer asset to this contract
        if(_asset != address(0)) { 
            require(IERC20(_asset).balanceOf(msg.sender) >= _amount, "Insufficient balance");
            IERC20(_asset).transferFrom(msg.sender, address(this), _amount);
        } else {
            // transfer native asset to this contract
            (bool success, ) = payable(address(this)).call{value: _amount}("");
            require(success, "Transfer failed");
        }
        
        Listing memory listing = Listing({
            index: listings.length,
            world_id: _world_id,
            seller: msg.sender,
            asset: _asset,
            amount: _amount,
            price: _price,
            isCancelled: false,
            isFulfilled: false,
            isActive: false
        });
        
        // add listing to seller's listings
        sellerListings[msg.sender].push(listing);
        // add listing to all listings
        listings.push(listing);

        return listing;
    }

    function cancelListing(uint256 _index) public {
        Listing storage listing = listings[_index];
        require(!listing.isActive, "Listing is disputed");
        require(listing.seller == msg.sender, "You are not the seller of this listing");
        listing.isCancelled = true;
    }

    function initiateOrder(uint256 _listingIndex, address _asset, uint256 _amount) public returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");

        Order memory order = Order({
            index: orders.length,
            listingIndex: _listingIndex,
            buyer: msg.sender,
            asset: _asset,
            amount: _amount,
            price: listings[_listingIndex].price,
            timestamp: block.timestamp,
            isFulfilled: false,
            isBuyerPaymentApproved: false,
            isSellerAccepted: false,
            isCancelled: false,
            isDisputed: false
        });

        listings[_listingIndex].isActive = true;

        buyerOrders[msg.sender].push(order.index);
        sellerOrders[listings[_listingIndex].seller].push(order.index);
        orders.push(order);

        return order.index;
    }

    function acceptOrderAsSeller(uint256 _index) public {
        Order storage order = orders[_index];
        require(listings[order.listingIndex].seller == msg.sender, "You are not the seller of this order");
        order.isSellerAccepted = true;
    }

    function cancelOrder(uint256 _index) public  {
        Order storage order = orders[_index];
        require(order.buyer == msg.sender || listings[order.listingIndex].seller == msg.sender, "You are not the buyer or seller of this order");
        order.isCancelled = true;
    }

    function approvePaymentAsBuyer(uint256 _index) public {
        Order storage order = orders[_index];
        require(order.isSellerAccepted, "Seller has not accepted the order");
        require(order.buyer == msg.sender, "You are not the buyer of this order");
        order.isBuyerPaymentApproved = true;
    }

    function disputeOrder(uint256 _index) public {
        Order storage order = orders[_index];
        require(order.isSellerAccepted, "Seller has not accepted the order");
        require(order.buyer == msg.sender || listings[order.listingIndex].seller == msg.sender, "You are not the buyer or seller of this order");

        listings[order.listingIndex].isActive = true;
        order.isDisputed = true;
    }

    function fulfillOrder(uint256 _index) public {
        Order storage order = orders[_index];
        Listing storage listing = listings[order.listingIndex];
        require(listing.seller == msg.sender, "You are not the seller of this order");
        // transfer asset from this contract to buyer
        if(order.asset != address(0)) {
            IERC20(order.asset).transfer(order.buyer, order.amount);
        } else {
            (bool success, ) = payable(order.buyer).call{value: order.amount}("");
            require(success, "Transfer failed");
        }
        listing.isActive = false;
        order.isFulfilled = true;
    }

    function getListingsBySeller(address _seller) public view returns (Listing[] memory) {
        return sellerListings[_seller];
    }

    function getOrdersBySeller(address _seller) public view returns (uint256[] memory) {
        return sellerOrders[_seller];
    }

    function getOrdersByBuyer(address _buyer) public view returns (uint256[] memory) {
        return buyerOrders[_buyer];
    }

    function getOrder(uint256 _index) public view returns (Order memory) {
        return orders[_index];
    }

    function getListing(uint256 _index) public view returns (Listing memory) {
        return listings[_index];
    }

    receive() external payable {}

}
