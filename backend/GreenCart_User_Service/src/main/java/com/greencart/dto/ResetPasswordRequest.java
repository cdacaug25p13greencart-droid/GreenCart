package com.greencart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ResetPasswordRequest {
	
	 String email;
     String newPassword;

}
