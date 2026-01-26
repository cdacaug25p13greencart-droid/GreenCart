package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.example.demo",
        "com.greencart.order"
})
@EnableJpaRepositories(basePackages = "com.greencart.order.repositories")
@EntityScan(basePackages = "com.greencart.order.entities")
public class GreenCartOrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreenCartOrderServiceApplication.class, args);
    }
}
