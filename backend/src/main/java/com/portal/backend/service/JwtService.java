package com.portal.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.portal.backend.domain.User;
import com.portal.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtService {
    private static final String SECRET = "JwtSecret";

    private final UserRepository userRepository;

    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> find(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(token);
            return userRepository.findById(jwt.getClaims().get("userId").asLong());
        } catch (JWTVerificationException ignored){
            return Optional.empty();
        }
    }

    public String create(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            return JWT.create()
                    .withClaim("userId", user.getId())
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException("Can't create JWT.", exception);
        }
    }
}

