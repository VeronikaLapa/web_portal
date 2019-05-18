package com.portal.backend.controller;

import com.portal.backend.domain.User;
import com.portal.backend.exception.ValidationException;
import com.portal.backend.repository.UserRepository;
import com.portal.backend.service.UserService;
import com.portal.backend.validator.UserCredentials;
import com.portal.backend.validator.UserCredentialsRegisterValidator;
import org.springframework.validation.BindingResult;
import org.springframework.validation.DataBinder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController extends ApiController {

    private UserService userService;

    private final UserCredentialsRegisterValidator userCredentialsRegisterValidator;

    @InitBinder
    public void initRegisterFormBinder(WebDataBinder binder) {
        binder.addValidators(userCredentialsRegisterValidator);
    }

    public UserController(UserService userService, UserCredentialsRegisterValidator userCredentialsRegisterValidator) {
        this.userService = userService;
        this.userCredentialsRegisterValidator = userCredentialsRegisterValidator;
    }

    @GetMapping("user/authenticated")
    public User getAuthenticatedUser(User user) {
        return user;
    }


    @GetMapping("user/all")
    public List getAllUsers(@RequestParam  String id) {
        return userService.findAll(id);
    }

    /*
    @GetMapping("user/all")
    public List getAllUsers() {
        return userService.findAll();
    }
*/
    @PostMapping("user")
    public User create(@Valid @RequestBody UserCredentials userCredentials,
                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().get(0).getDefaultMessage());
        }
        return userService.create(userCredentials);
    }

    @GetMapping("user/in")
    public User auth(@RequestParam String login, @RequestParam String password) {
        return userService.findByLoginAndPassword(login, password).orElseThrow(() -> new ValidationException("Wrong login or password"));
    }
}