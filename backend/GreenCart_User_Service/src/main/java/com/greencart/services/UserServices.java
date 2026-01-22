package com.greencart.services;


import java.util.List;
import com.greencart.dto.*;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	
	public User login(String username, String password) {

        User user = userrepo.findByUsername(username);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new RuntimeException("User is not active");
        }

        return user;
    }

	


	
	public User registerUser(RegisterUserRequest request) {

	    if (request.getAreaId() == null) {
	        throw new RuntimeException("Area is required");
	    }

	    User user = new User();

	    user.setUsername(request.getUsername());
	    user.setPassword(request.getPassword());
	    user.setFirstName(request.getFirstName());
	    user.setLastName(request.getLastName());
	    user.setRoleId(request.getRoleId());
	    user.setAadhaarNo(request.getAadhaarNo());
	    user.setEmail(request.getEmail());
	    user.setPhone(request.getPhone());
	    user.setAnswer(request.getAnswer());

	    user.setStatus(
	        request.getRoleId() == 2
	            ? UserStatus.PENDING
	            : UserStatus.ACTIVE
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

	    user.setPassword(request.getNewPassword()); // hash later
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
	        q.getQuestion()
	    );
	}

	

}
