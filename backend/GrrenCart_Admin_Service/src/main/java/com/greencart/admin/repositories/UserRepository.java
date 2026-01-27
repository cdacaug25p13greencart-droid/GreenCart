package com.greencart.admin.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.greencart.admin.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRoleId(Integer roleId);
}
