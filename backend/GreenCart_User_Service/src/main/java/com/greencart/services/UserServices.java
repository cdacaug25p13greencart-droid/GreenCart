package com.greencart.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greencart.entities.ForgotPasswordRequest;
import com.greencart.entities.ResetPasswordRequest;
import com.greencart.entities.User;
import com.greencart.enums.UserStatus;
import com.greencart.repositories.UserRepo;

@Service
public class UserServices {
	
	@Autowired
	UserRepo userrepo;

	public List<User> getAll() {
		return userrepo.findAll();
	}
	

	public User registerUser(User user) {
	    // 🔒 Force status to PENDING
        user.setStatus(UserStatus.PENDING);

        // created_at will be set by @PrePersist
        return userrepo.save(user);
	}
	
	
	public boolean verifySecurityAnswer(ForgotPasswordRequest request) {

	    String email = request.getEmail().trim().toLowerCase();

	    User user = userrepo.findByEmail(email);

	    if (user == null) {
	        throw new RuntimeException("User not found");
	    }

	    if (user.getQuestionId() != request.getQuestionId()) {
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

	
	

}
