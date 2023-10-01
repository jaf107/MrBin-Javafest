package com.mrbin.controllers;

import com.mrbin.models.Product;
import com.mrbin.models.Recycler;
import com.mrbin.payload.response.MessageResponse;
import com.mrbin.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping(value = "products")
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<List<Product>>(productService.getAllProducts(), HttpStatus.OK) ;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "product/new")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping(value = "product/{id}")
    public ResponseEntity<?> getSingleProduct(@PathVariable("id") String id){
        Optional<Product> productQuery = productService.getProduct(id);
        if(productQuery.isPresent()) return new ResponseEntity<Product>(productQuery.get(), HttpStatus.OK);
        else return new ResponseEntity<MessageResponse>(new MessageResponse("Product not found"), HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("product/{username}/all-product")
    public ResponseEntity<?> getAllProductsForAUser(@PathVariable("username") String username) {
        return productService.getAllProductsForAUser(username);
    }
}
