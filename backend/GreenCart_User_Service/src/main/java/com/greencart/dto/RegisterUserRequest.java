package com.greencart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserRequest {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Integer roleId;
    private String aadhaarNo;
    private String email;
    private String phone;
    private String city;

    private Integer questionId;   // 👈 IMPORTANT
    private String answer;
}
