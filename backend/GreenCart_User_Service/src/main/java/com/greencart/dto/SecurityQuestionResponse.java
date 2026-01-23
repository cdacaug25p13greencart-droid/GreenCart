package com.greencart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SecurityQuestionResponse {
    private Integer questionId;
    private String question;
}
