package com.greencart.admin.entities;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid")
    private Integer pid;

    @Column(name = "pname", length = 100, nullable = false)
    private String pname;

    @Column(name = "sub_category_id")
    private Integer subCategoryId;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
