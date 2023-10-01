package com.mrbin.payload.request;

import com.mrbin.models.EStates.EOrderStatus;
import com.mrbin.models.Product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderListingRequest {
    @JsonProperty("id")
    public String orderId;

    @JsonProperty("product")
    public Product product;

    @JsonProperty("buyer")
    public String buyerUserName;

    @JsonProperty("seller")
    public String sellerUserName;

    @JsonProperty("price")
    public double askingPrice;

    @JsonProperty("status")
    public EOrderStatus status;

    public OrderListingRequest(Product product, String buyerUserName) {
        this.product = product;
        this.buyerUserName = buyerUserName;
    }

    public OrderListingRequest(Product product, String buyerUserName, double askingPrice) {
        this.product = product;
        this.buyerUserName = buyerUserName;
        this.askingPrice = askingPrice;
    }

    public OrderListingRequest(String orderId, EOrderStatus status) {
        this.orderId = orderId;
        this.status = status;
    }
}
