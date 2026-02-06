package com.greencart.controllers;

import com.greencart.dto.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greencart.entities.User;
import com.greencart.enums.UserStatus;
import com.greencart.services.UserServices;
import com.greencart.utils.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserServices userServices;

	@Autowired
	JwtUtil jwtUtil;

	@GetMapping("/getall")
	public List<User> getAll() {
		return userServices.getAll();
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {

		try {
			User user = userServices.login(
					request.getUsername(),
					request.getPassword());

			String role;
			switch (user.getRoleId()) {
				case 1 -> role = "ADMIN";
				case 2 -> role = "FARMER";
				case 3 -> role = "BUYER";
				default -> role = "UNKNOWN";
			}

			// Generate JWT token
			String token = jwtUtil.generateToken(user);
			Long expiresIn = jwtUtil.getExpirationTime();

			// Create HttpOnly cookie
			ResponseCookie cookie = ResponseCookie.from("jwt", token)
					.httpOnly(true)
					.secure(false) // Set to true in production with HTTPS
					.path("/")
					.maxAge(expiresIn / 1000)
					.sameSite("Lax")
					.build();

			LoginResponse response = new LoginResponse(
					user.getUserId(),
					user.getUsername(),
					user.getFirstName(),
					user.getLastName(),
					user.getEmail(),
					user.getPhone(),
					role,
					user.getStatus(),
					token,
					expiresIn);

			return ResponseEntity.ok()
					.header(HttpHeaders.SET_COOKIE, cookie.toString())
					.body(response);

		} catch (RuntimeException ex) {

			if ("ACCOUNT_NOT_VERIFIED".equals(ex.getMessage())) {
				return ResponseEntity
						.status(403)
						.body("ACCOUNT_NOT_VERIFIED");
			}

			return ResponseEntity
					.badRequest()
					.body("INVALID_CREDENTIALS");
		}
	}

	@PostMapping("/register")
	public User registerUser(@RequestBody RegisterUserRequest request) {
		return userServices.registerUser(request);
	}

	@GetMapping("/forgot-password/question")
	public ResponseEntity<?> getUserSecurityQuestion(@RequestParam String email) {
		try {
			return ResponseEntity.ok(
					userServices.getUserSecurityQuestion(email));
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/forgot-password/verify")
	public ResponseEntity<String> verifyAnswer(
			@RequestBody ForgotPasswordRequest request) {

		try {
			userServices.verifySecurityAnswer(request);
			return ResponseEntity.ok("Answer verified");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/forgot-password/reset")
	public ResponseEntity<String> resetPassword(
			@RequestBody ResetPasswordRequest request) {

		try {
			userServices.resetPassword(request);
			return ResponseEntity.ok("Password reset successful");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(
			@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader,
			@CookieValue(value = "jwt", required = false) String cookieToken) {
		String token = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
		} else if (cookieToken != null) {
			token = cookieToken;
		}

		if (token != null && jwtUtil.validateToken(token)) {
			String username = jwtUtil.getUsernameFromToken(token);
			User user = userServices.getByUsername(username);

			String role;
			switch (user.getRoleId()) {
				case 1 -> role = "ADMIN";
				case 2 -> role = "FARMER";
				case 3 -> role = "BUYER";
				default -> role = "UNKNOWN";
			}

			LoginResponse response = new LoginResponse(
					user.getUserId(),
					user.getUsername(),
					user.getFirstName(),
					user.getLastName(),
					user.getEmail(),
					user.getPhone(),
					role,
					user.getStatus(),
					token,
					jwtUtil.getExpirationTime());
			return ResponseEntity.ok(response);
		}
		return ResponseEntity.status(401).body("UNAUTHORIZED");
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout() {
		ResponseCookie cookie = ResponseCookie.from("jwt", "")
				.httpOnly(true)
				.secure(false)
				.path("/")
				.maxAge(0)
				.sameSite("Lax")
				.build();
		return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, cookie.toString())
				.body("Logged out successfully");
	}

}
