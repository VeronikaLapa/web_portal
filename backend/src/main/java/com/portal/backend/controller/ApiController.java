package com.portal.backend.controller;

import com.portal.backend.domain.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ApiController {
    @ModelAttribute
    public User getUser(HttpServletRequest httpServletRequest) {
        User user = (User) httpServletRequest.getAttribute("user");
        return user;
    }

}