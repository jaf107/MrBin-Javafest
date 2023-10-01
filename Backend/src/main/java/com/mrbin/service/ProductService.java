package com.mrbin.service;

import com.mrbin.models.Product;
import com.mrbin.models.User;
import com.mrbin.payload.response.MessageResponse;
import com.mrbin.repository.ProductRepository;
import com.mrbin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Optional<Product> getProduct(String id){
        return productRepository.findById(id);
    }

    public ResponseEntity<?> getAllProductsForAUser(String username) {
        Optional<User> userQuery = userRepository.findByUsername(username);
        if(userQuery.isPresent()) {
            User user = userQuery.get();
            String userId = user.getId();
            Optional<List<Product>> productQuery = productRepository.findAllByUserId(userId);

            if (productQuery.isPresent()) {
               List<Product> products = productQuery.get();
               return new ResponseEntity<>(products, HttpStatus.OK);
            }

            return new ResponseEntity<>(new MessageResponse("No product found"), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(new MessageResponse("User not found"), HttpStatus.NOT_FOUND);
    }
}
