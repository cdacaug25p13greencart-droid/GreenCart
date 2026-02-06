package com.greencart.services;

import java.util.List;
import com.greencart.dto.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.greencart.entities.Area;
import com.greencart.entities.SecurityQuestion;
import com.greencart.entities.User;
import com.greencart.enums.UserStatus;
import com.greencart.repositories.AreaRepo;
import com.greencart.repositories.SecurityQuestionRepo;
import com.greencart.repositories.UserRepo;

@Service
public class UserServices {

	@Autowired
	UserRepo userrepo;

	@Autowired
	SecurityQuestionRepo questionRepo;

	@Autowired
	AreaRepo arearepo;

	public List<User> getAll() {
		return userrepo.findAll();
	}

	@Autowired
	private PasswordEncoder passwordEncoder;

	public User login(String username, String password) {

		User user = userrepo.findByUsername(username);

		if (user == null) {
			throw new RuntimeException("INVALID_CREDENTIALS");
		}

		// Hybrid approach: Check if password is already hashed (BCrypt hashes start
		// with $2a$ or $2b$)
		if (user.getPassword().startsWith("$2")) {
			// Password is already hashed - use BCrypt comparison
			if (!passwordEncoder.matches(password, user.getPassword())) {
				throw new RuntimeException("INVALID_CREDENTIALS");
			}
		} else {
			// Password is plain text (legacy) - direct comparison
			if (!user.getPassword().equals(password)) {
				throw new RuntimeException("INVALID_CREDENTIALS");
			}
			// Upgrade to hashed password for future logins
			user.setPassword(passwordEncoder.encode(password));
			userrepo.save(user);
		}

		if (user.getStatus().equals(UserStatus.PENDING.getCode())) {
			throw new RuntimeException("ACCOUNT_NOT_VERIFIED");
		}

		return user;
	}

	public User registerUser(RegisterUserRequest request) {

		if (request.getAreaId() == null) {
			throw new RuntimeException("Area is required");
		}

		User user = new User();

		user.setUsername(request.getUsername());
		// Hash password before saving
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setRoleId(request.getRoleId());
		user.setAadhaarNo(request.getAadhaarNo());
		user.setEmail(request.getEmail());
		user.setPhone(request.getPhone());
		user.setAnswer(request.getAnswer());

		user.setStatus(
				request.getRoleId() == 2
						? UserStatus.PENDING.getCode() // 2
						: UserStatus.ACTIVE.getCode() // 1
		);

		SecurityQuestion question = questionRepo
				.findById(request.getQuestionId())
				.orElseThrow(() -> new RuntimeException("Invalid question"));
		user.setQuestion(question);

		Area area = arearepo
				.findById(request.getAreaId())
				.orElseThrow(() -> new RuntimeException("Invalid area"));
		user.setArea(area);

		return userrepo.save(user);
	}

	public boolean verifySecurityAnswer(ForgotPasswordRequest request) {

		String email = request.getEmail().trim().toLowerCase();

		User user = userrepo.findByEmail(email);

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		if (!user.getQuestion().getQuestion_id()
				.equals(request.getQuestionId())) {
			throw new RuntimeException("Security question mismatch");
		}

		if (!user.getAnswer().equalsIgnoreCase(request.getAnswer().trim())) {
			throw new RuntimeException("Incorrect answer");
		}

		return true;
	}

	public void resetPassword(ResetPasswordRequest request) {

		String email = request.getEmail().trim().toLowerCase();

		User user = userrepo.findByEmail(email);

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		// Hash new password before saving
		user.setPassword(passwordEncoder.encode(request.getNewPassword()));
		userrepo.save(user);
	}

	// 🔐 Fetch user's security question by email
	public SecurityQuestionResponse getUserSecurityQuestion(String email) {

		if (email == null || email.isBlank()) {
			throw new RuntimeException("Email is required");
		}

		User user = userrepo.findByEmail(email.trim().toLowerCase());

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		SecurityQuestion q = user.getQuestion();

		if (q == null) {
			throw new RuntimeException("Security question not set for user");
		}

		return new SecurityQuestionResponse(
				q.getQuestion_id(),
				q.getQuestion());
	}

	public User getByUsername(String username) {
		return userrepo.findByUsername(username);
	}

}
