package com.portal.backend.repository;


import com.portal.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    int countByLogin(String login);

    Optional<User> findByLoginAndPassword(String login, String password);

    User save(User user);

    @Query(value = "SELECT id, login, name, email, password, creation_time FROM user WHERE id=?1 UNION SELECT id,login, name, email, '', creation_time FROM user WHERE id!=?1", nativeQuery = true)
    List<User> findAll(String id);
}
