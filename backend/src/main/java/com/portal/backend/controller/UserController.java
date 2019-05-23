package com.portal.backend.controller;

import com.portal.backend.domain.User;
import com.portal.backend.exception.ValidationException;
import com.portal.backend.service.UserService;
import com.portal.backend.validator.UserCredentials;
import com.portal.backend.validator.UserCredentialsValidator;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController extends ApiController {

    private UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("authenticated")
    public User getAuthenticatedUser(User user) {
        return user;
    }


    @GetMapping("all")
    public List getAllUsers(User user) {
        return userService.findAll(user);
    }

    @GetMapping("all/filtered")
    public List getUsers(User user, @RequestParam String login, @RequestParam String name, @RequestParam String email) {
        List<User> users = getAllUsers(user);
        if (!login.equals("")) {
            users = users.
                    stream().
                    filter(usr -> usr.getLogin().equals(login))
                    .collect(Collectors.toList());
        }
        if (!name.equals("")) {
            users = users.
                    stream().
                    filter(usr -> usr.getName().equals(name))
                    .collect(Collectors.toList());
        }
        if (!email.equals("")) {
            users = users.
                    stream().
                    filter(usr -> usr.getEmail().equals(email))
                    .collect(Collectors.toList());
        }
        return users;
    }
}