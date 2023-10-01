package com.mrbin.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bid {
    private String buyerId;
    private Date date = new Date();
    private String name;
    private Address address;
    private Double amount;
    private String exchangeProductId;

    @Override
    public String toString() {
        return "Bid{" +
                "buyerId='" + buyerId + '\'' +
                ", date=" + date +
                ", name='" + name + '\'' +
                ", address=" + address +
                ", amount=" + amount +
                ", exchangeProductId='" + exchangeProductId + '\'' +
                '}';
    }
}
