package com.greencart.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greencart.entities.Area;

public interface AreaRepo extends JpaRepository<Area, Integer> {
	
	List<Area> findByCityId(Integer city_id);

}
