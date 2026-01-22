package com.greencart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greencart.entities.City;

public interface CityRepo extends JpaRepository<City, Integer> {

}
