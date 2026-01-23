package com.greencart.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.greencart.enums.UserStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name="users")
public class User {
	

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "username", length = 50, nullable = false, unique = true)
    private String username;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "first_name", length = 50)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    // FK → roles table
    @Column(name = "role_id", nullable = false)
    private Integer roleId;

    @Column(name = "aadhaar_no", length = 12)
    private String aadhaarNo;

    @Column(name = "email", length = 100, unique = true)
    private String email;

    @Column(name = "phone", length = 15)
    private String phone;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id")
    @JsonIgnore   // optional, prevents infinite recursion in JSON
    private Area area;


    @Column(name = "status", nullable = false)
    private Integer status;

 // ✅ Helper method (ADD THIS)
    public UserStatus getStatusEnum() {
        return UserStatus.fromCode(this.status);
    }

    // optional setter if needed later
    public void setStatusEnum(UserStatus status) {
        this.status = status.getCode();
    }
  

    @ManyToOne
    @JoinColumn(name = "question_id")
    private SecurityQuestion question;



    @Column(name = "answer", length = 255, nullable = false)
    private String answer;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /* Auto set timestamp */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }


}
