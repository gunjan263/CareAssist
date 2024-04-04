package com.hexaware.careassist.service;

public interface IEmailService {
    void sendEmail(String to, String subject, String body);
}
