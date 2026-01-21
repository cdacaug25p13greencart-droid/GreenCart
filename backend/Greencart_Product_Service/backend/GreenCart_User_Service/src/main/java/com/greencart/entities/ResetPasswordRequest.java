package com.greencart.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ResetPasswordRequest {
	
	 String email;
     String newPassword;

}
