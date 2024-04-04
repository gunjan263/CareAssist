package com.hexaware.careassist.security;

import com.hexaware.careassist.entity.Role;
import com.hexaware.careassist.entity.User;

public class AuthenticationResponse {
    private String token;
    private String message;
    private String username;
    private Role role;
    private Integer userId;

    public AuthenticationResponse(String token, String message, String username, Role role, Integer userId) {
        this.token = token;
        this.message = message;
        this.username = username;
        this.role = role;
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }

    public String getUsername() {
        return username;
    }

    public Role getRole() {
        return role;
    }

    public Integer getUserId() {
        return userId;
    }
}