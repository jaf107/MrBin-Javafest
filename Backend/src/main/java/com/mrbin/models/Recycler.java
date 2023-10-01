package com.mrbin.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mrbin.models.EStates.EAccountState;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "recyclers")
public class Recycler {

    @Id
    private String id;

    // name -> employee username
    @JsonProperty("name")
    @Field(name = "name")
    private String name;

    @JsonProperty("company")
    @Field(name = "company")
    private String company;

    @JsonProperty("location")
    @Field(name = "location")
    private String location;

    @JsonProperty("phone")
    @Field(name = "phone")
    private String phone;

    @Getter
    @Setter
    @Field(name = "verification")
    private EAccountState accountState = EAccountState.VERIFICATION_PENDING;

    public Recycler(String name, String company, String location, String phone) {
        this.name = name;
        this.company = company;
        this.location = location;
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Recycler{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", company='" + company + '\'' +
                ", location='" + location + '\'' +
//                ", avatar=" + avatar +
                ", phone='" + phone + '\'' +
                '}';
    }
}
