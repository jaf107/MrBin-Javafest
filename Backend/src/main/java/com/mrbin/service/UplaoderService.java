package com.mrbin.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UplaoderService {
    @Value("${Mr.Bin.Cloudinary.Api.Secrate}")
    private String cloudinaryApiSecrate;

    @Value("${Mr.Bin.Cloudinary.Api.Key}")
    private String cloudinaryApiKey;

    @Value("${Mr.Bin.Cloudinary.Api.CloudName}")
    private String coludinaryCloudName;
}
