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
@Table(name="areas")

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer area_id;

    @Column(nullable = false)
    private String area_name;

    @Column(nullable = false)
    private Integer pincode;

    @Column(name="city_id", nullable = false)
    private Integer cityId;
}
