package com.greencart.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "cities")

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class City {
	

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   
    private Integer city_id;

    @Column(nullable = false)
    private String city_name;

}
