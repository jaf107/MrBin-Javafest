package com.mrbin.controllers;

import com.mrbin.models.Order;
import com.mrbin.payload.request.OrderListingRequest;
import com.mrbin.payload.response.MessageResponse;
import com.mrbin.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("api/v1/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/new")
    public ResponseEntity<?> placeOrder(@RequestBody OrderListingRequest orderListingRequest) {
        return orderService.createNewListing(orderListingRequest.getProduct(), orderListingRequest.getBuyerUserName());
    }

    @PostMapping("/new/donation")
    @PreAuthorize("hasRole('ORGANIZATION')")
    public ResponseEntity<?> placeDonationRequest(@RequestBody OrderListingRequest orderListingRequest) {
        return orderService.createNewDonationOrder(orderListingRequest.getProduct(), orderListingRequest.getBuyerUserName());
    }

    @PostMapping("/new/recycle")
    @PreAuthorize("hasRole('RECYCLER')")
    public ResponseEntity<?> placeRecycleOrder(@RequestBody OrderListingRequest orderListingRequest) {
        return orderService.createNewRecycleOrder(orderListingRequest.getProduct(), orderListingRequest.getBuyerUserName(), orderListingRequest.getAskingPrice());
    }

    @GetMapping("/get/sell-order/{sellerUserName}")
    public ResponseEntity<?> getSellOrderList(@PathVariable("sellerUserName") String sellerUserName) {
        List<Order> orders = orderService.getAllListingForASeller(sellerUserName);
        if(!orders.isEmpty()) return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
        else return new ResponseEntity<MessageResponse>(new MessageResponse("No Order request found"), HttpStatus.NO_CONTENT);
    }

    @GetMapping("/get/buy-order/{buyerUserName}")
    public ResponseEntity<?> getBuyOrderList(@PathVariable("buyerUserName") String buyerUserName) {
        List<Order> orders = orderService.getAllListingForABuyer(buyerUserName);
        if(!orders.isEmpty()) return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
        else return new ResponseEntity<MessageResponse>(new MessageResponse("No Order request found"), HttpStatus.NO_CONTENT);
    }

    @GetMapping("/get-single/{orderId}")
    public ResponseEntity<?> getSingleOrder(@PathVariable("orderId") String orderId) {
        return orderService.getSingleOrder(orderId);
    }

    @PutMapping("/update/status")
    public ResponseEntity<?> updateOrderStatus(@RequestBody OrderListingRequest orderListingRequest) {
        return  orderService.updateOrder(orderListingRequest.getOrderId(), orderListingRequest.getStatus());
    }
}
