package com.portal.backend.service;

import com.portal.backend.domain.User;
import com.portal.backend.exception.ValidationException;
import com.portal.backend.repository.UserRepository;
import com.portal.backend.validator.UserCredentials;
import com.portal.backend.validator.UserUpdateCredentials;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public boolean isLoginVacant(String login) {
        return userRepository.countByLogin(login) == 0;
    }

    public Optional<User> findByLoginAndPassword(String login, String password) {
        return userRepository.findByLoginAndPassword(login, password);
    }

    public List findAll() {
        return userRepository.findAll();
    }

    public List findAll(User user) {
        return userRepository.findAll(String.valueOf(user.getId()));
    }

    /*
    public User create(User user) {
        return userRepository.save(user);
    }
    */
    public User create(UserCredentials userCredentials) {
        User user = new User();
        user.setLogin(userCredentials.getLogin());
        user.setName(userCredentials.getName());
        user.setPassword(userCredentials.getPassword());
        user.setEmail(userCredentials.getEmail());
        return userRepository.save(user);
    }

    public User update(UserUpdateCredentials info, User user) {
        if (info.getName()!= null) {
            user.setName(info.getName());
        }
        if (info.getLogin() != null) {
            user.setLogin(info.getLogin());
        }
        if (info.getEmail() != null) {
            user.setEmail(info.getEmail());
        }
        if (info.getPassword() != null) {
            user.setPassword(info.getPassword());
        }
        //return userRepository.setUserInfoById(user.getLogin(), user.getName(), user.getEmail(), user.getPassword(), user.getId());
        user = userRepository.save(user);
        jwtService.create(user);
        return user;
    }
}

