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

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RegistrationFormController extends ApiController {

    private UserService userService;

    private final UserCredentialsValidator userCredentialsValidator;

    @InitBinder
    public void initRegisterFormBinder(WebDataBinder binder) {
        binder.addValidators(userCredentialsValidator);
    }

    public RegistrationFormController(UserService userService, UserCredentialsValidator userCredentialsValidator) {
        this.userService = userService;
        this.userCredentialsValidator = userCredentialsValidator;
    }

    @PostMapping("user")
    public User create(@Valid @RequestBody UserCredentials userCredentials,
                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().get(0).getDefaultMessage());
        }
        return userService.create(userCredentials);
    }

}