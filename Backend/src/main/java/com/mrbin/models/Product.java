package com.mrbin.models;

import com.mrbin.utils.Avatar;
import com.mrbin.utils.Comment;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {
    @Id
    @Getter
    public String id;

    @JsonProperty("name")
    @Field(name = "name")
    private String name;

    @JsonProperty("category")
    @Field(name = "category")
    private String category;

    @JsonProperty("address")
    @Field(name = "address")
    private String address;

    @JsonProperty("quantity")
    @Field(name = "quantity")
    private Integer quantity = 1;

    @JsonProperty("condition")
    @Field(name = "condition")
    private String condition = "used";

    @JsonProperty("images")
    @Field(name = "images")
    private List<Avatar> images = new ArrayList<>();

    @JsonProperty("userId")
    @Field(name = "userId")
    private String userId; // Assuming this is the user ID as a string

    @JsonProperty("buyer")
    @Field(name = "buyer")
    private String buyerId; // Assuming this is the buyer ID as a string

    @JsonProperty("productType")
    @Field(name = "productType")
    private String productType = "marketplace";

    @JsonProperty("description")
    @Field(name = "description")
    private String description;

    @JsonProperty("dateOfPurchase")
    @Field(name = "dateOfPurchase")
    private String dateOfPurchase;

    @JsonProperty("purchasePrice")
    @Field(name = "purchasePrice")
    private Double purchasePrice;

    @JsonProperty("askingPrice")
    @Field(name = "askingPrice")
    private Double askingPrice;

    @JsonProperty("comments")
    @Field(name = "comments")
    private List<Comment> comments = new ArrayList<>();

    @Field(name = "created_at")
    private Date createdAt = new Date();

    // Constructors, getters, setters, and other methods...

    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", address=" + address +
//                ", isVerified=" + isVerified +
                ", quantity=" + quantity +
                ", condition='" + condition + '\'' +
                ", images=" + images +
                ", userId='" + userId + '\'' +
                ", buyerId='" + buyerId + '\'' +
                ", productType='" + productType + '\'' +
                ", description='" + description + '\'' +
                ", dateOfPurchase='" + dateOfPurchase + '\'' +
                ", purchasePrice=" + purchasePrice +
//                ", bids=" + bids +
                ", comments=" + comments +
                ", createdAt=" + createdAt +
                '}';
    }

    public Product(String name, String category, String address, String condition, String userId, String productType, String description, String dateOfPurchase, Double purchasePrice, Double askingPrice) {
        this.name = name;
        this.category = category;
        this.address = address;
        this.condition = condition;
        this.userId = userId;
        this.productType = productType;
        this.description = description;
        this.dateOfPurchase = dateOfPurchase;
        this.purchasePrice = purchasePrice;
        this.askingPrice = askingPrice;
    }

    public Product(String name, String category, String address, Integer quantity, String condition, String userId, String productType, String description, String dateOfPurchase, Double purchasePrice, Double askingPrice) {
        this.name = name;
        this.category = category;
        this.address = address;
        this.quantity = quantity;
        this.condition = condition;
        this.userId = userId;
        this.productType = productType;
        this.description = description;
        this.dateOfPurchase = dateOfPurchase;
        this.purchasePrice = purchasePrice;
        this.askingPrice = askingPrice;
    }
}