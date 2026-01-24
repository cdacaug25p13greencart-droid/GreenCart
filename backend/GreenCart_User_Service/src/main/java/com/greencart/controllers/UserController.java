package com.greencart.controllers;

import com.greencart.dto.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserServices uesrservices;

	@Autowired
	JwtUtil jwtUtil;

	@GetMapping("/getall")
	public List<User> getAll() {
		return uesrservices.getAll();
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {

		try {
			User user = uesrservices.login(
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

			return ResponseEntity.ok(response);

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
		return uesrservices.registerUser(request);
	}

	@GetMapping("/forgot-password/question")
	public ResponseEntity<?> getUserSecurityQuestion(@RequestParam String email) {
		try {
			return ResponseEntity.ok(
					uesrservices.getUserSecurityQuestion(email));
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/forgot-password/verify")
	public ResponseEntity<String> verifyAnswer(
			@RequestBody ForgotPasswordRequest request) {

		try {
			uesrservices.verifySecurityAnswer(request);
			return ResponseEntity.ok("Answer verified");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/forgot-password/reset")
	public ResponseEntity<String> resetPassword(
			@RequestBody ResetPasswordRequest request) {

		try {
			uesrservices.resetPassword(request);
			return ResponseEntity.ok("Password reset successful");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}
