package com.example.demo.config;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class RouterConfig {

	@Bean
	public RouteLocator createRoutes(RouteLocatorBuilder builder) {

		return builder.routes()
				// User Service
				.route("user-service", r -> r.path("/user/**", "/location/**", "/security/**")
						.uri("http://localhost:8084"
								+ ""))
				// Buyer Service - MUST come before product-service to handle
				// /api/products/available
				.route("buyer-service",
						r -> r.path("/api/orders/**", "/api/cart/**", "/api/farmer/orders/**",
								"/api/products/available")
								.uri("http://localhost:8082"))
				// Product Service - handles products, categories, subcategories, stocks
				.route("product-service",
						r -> r.path("/api/products/**", "/api/categories/**", "/api/subcategories/**", "/categories/**",
								"/products/**", "/stocks/**", "/subcategories/**")
								.uri("http://localhost:8081"))
				// .NET Admin Service
				.route("admin-service", r -> r.path("/api/admin/**")
						.uri("http://localhost:5026"))
				.build();

	}

}
