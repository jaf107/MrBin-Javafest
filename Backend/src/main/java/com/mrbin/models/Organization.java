package com.mrbin.models;

import com.mrbin.models.EStates.EAccountState;
import com.mrbin.utils.Avatar;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "organizations")
@Data
@NoArgsConstructor
public class Organization {
    @Id
    private String id;

    @JsonProperty("name")
    @Field(name = "name")
    private String name;

    @JsonProperty("organization")
    @Field(name = "organization")
    private String organization;

    @JsonProperty("location")
    @Field(name = "location")
    private String location;

    @JsonProperty("avatar")
    @Field(name = "avatar")
    private Avatar avatar;

    @JsonProperty("phone")
    @Field(name = "phone")
    private String phone;

    @Getter
    @Setter
    @Field(name = "verification")
    private EAccountState accountState = EAccountState.VERIFICATION_PENDING;

    public Organization(String id, String name, String organization, String location, String phone) {
        this.id = id;
        this.name = name;
        this.organization = organization;
        this.location = location;
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Organization{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", organization='" + organization + '\'' +
                ", location='" + location + '\'' +
                ", avatar=" + avatar +
                ", phone='" + phone + '\'' +
                '}';
    }
}