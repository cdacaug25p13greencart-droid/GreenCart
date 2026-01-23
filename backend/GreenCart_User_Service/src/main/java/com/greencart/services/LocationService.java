package com.greencart.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greencart.repositories.AreaRepo;
import com.greencart.repositories.CityRepo;
import java.util.*;
import com.greencart.entities.*;

@Service
public class LocationService {
	
	@Autowired
	CityRepo cityrepo;
	
	@Autowired
	AreaRepo arearepo;
	
    public List<City> getAllCities() {
        return cityrepo.findAll();
    }

//    public List<Area> getAreasByCity(Integer cityId) {
//        return arearepo.findByCityCityId(cityId);
//    }
    
    public List<Area> getAreasByCity(Integer cityId) {
        return arearepo.findByCityCityId(cityId); // ✅ CORRECT
    }


}
