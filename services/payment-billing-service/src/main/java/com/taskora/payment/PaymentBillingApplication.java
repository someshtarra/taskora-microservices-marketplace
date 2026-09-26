package com.taskora.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentBillingApplication {
    public static void main(String[] args) {
        System.out.println("[Taskora] Starting Java Spring Boot Payment & Billing Microservice on port 8004...");
        SpringApplication.run(PaymentBillingApplication.class, args);
    }
}
