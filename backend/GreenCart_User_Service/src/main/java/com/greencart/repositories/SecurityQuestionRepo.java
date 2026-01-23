package com.greencart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greencart.entities.SecurityQuestion;

public interface SecurityQuestionRepo extends JpaRepository<SecurityQuestion, Integer> {

}
