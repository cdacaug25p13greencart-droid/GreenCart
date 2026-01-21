package com.greencart.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ForgotPasswordRequest {
	
	private String email;
    private int questionId;
    private String answer;
    
}
