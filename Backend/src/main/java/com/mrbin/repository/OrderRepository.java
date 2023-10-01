package com.mrbin.repository;

import com.mrbin.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findAllBySellerUserName(String sellerUserName);

    List<Order> findAllByBuyerUserName(String buyerUserName);
}
