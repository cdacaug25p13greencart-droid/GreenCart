package com.greencart.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.greencart.entities.*;

import com.greencart.services.LocationService;

@RestController
@RequestMapping("/location")

public class LocationController {

    @Autowired
    private LocationService locationservice;

    // Load city dropdown
    @GetMapping("/cities")
    public List<City> getCities() {
        return locationservice.getAllCities();
    }

    // Load areas based on selected city
    @GetMapping("/areas/{cityId}")
    public List<Area> getAreasByCity(@PathVariable Integer cityId) {
        return locationservice.getAreasByCity(cityId);
    }

}
