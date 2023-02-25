package com.org.agencyapi.rest;

import com.org.agencyapi.config.SwaggerConfig;
import com.org.agencyapi.exception.DuplicatedUserInfoException;
import com.org.agencyapi.model.Blog;
import com.org.agencyapi.repository.UserRepository;
import com.org.agencyapi.rest.dto.BlogDto;
import com.org.agencyapi.rest.dto.auth.*;
import com.org.agencyapi.security.CustomUserDetails;
import com.org.agencyapi.security.TokenProvider;
import com.org.agencyapi.security.WebSecurityConfig;
import com.org.agencyapi.service.UserService;
import com.org.agencyapi.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    @PostMapping("/signin")
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword(), loginRequest.getRemember_me());
        User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException(String.format("user %s not found", loginRequest.getUsername())));
        user.setRemember_me(loginRequest.getRemember_me());
        userRepository.save(user);
        return new AuthResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new DuplicatedUserInfoException(String.format("Username %s already been used", signUpRequest.getUsername()));
        }
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new DuplicatedUserInfoException(String.format("Email %s already been used", signUpRequest.getEmail()));
        }

        try {
            userService.saveUser(mapSignUpRequestToUser(signUpRequest));
            return ResponseEntity.ok("User registered Successfully");
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(("User not registered"));
        }
//
//        String token = authenticateAndGetToken(signUpRequest.getUsername(), signUpRequest.getPassword());
//        return new AuthResponse(token);
    }
    @PostMapping("/checkusername")
    public ResponseEntity<?> checkUserName(@Valid @RequestBody CheckUserNameRequest checkUserNameRequest) {
        if(userService.hasUserWithUsername(checkUserNameRequest.getUsername())){
            throw new DuplicatedUserInfoException(String.format("Username %s already been used", checkUserNameRequest.getUsername()));
        }
        return ResponseEntity.ok("Username is unique");
    }
    @PostMapping("/checkemail")
    public ResponseEntity<?> checkEmail(@Valid @RequestBody CheckEmailRequest checkEmailRequest) {
        if(userService.hasUserWithEmail(checkEmailRequest.getEmail())){
            throw new DuplicatedUserInfoException(String.format("Email %s already been used", checkEmailRequest.getEmail()));
        }
        return ResponseEntity.ok("Email is unique");
    }

    @PostMapping("/checkphone")
    public ResponseEntity<?> checkPhone(@Valid @RequestBody CheckPhoneNumberRequest checkPhoneNumberRequest) {
        if(userService.hasUserWithPhone(checkPhoneNumberRequest.getPhonenumber())){
            throw new DuplicatedUserInfoException(String.format("Phone Number %s already been used", checkPhoneNumberRequest.getPhonenumber()));
        }
        return ResponseEntity.ok("Phone number is unique");
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal CustomUserDetails currentUser) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        user.setRemember_me(false);
        userRepository.save(user);
        return ResponseEntity.ok("User successfully Logout");
    }
    private String authenticateAndGetToken(String username, String password, Boolean remember_me) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication, remember_me);
    }

    private User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setGender(signUpRequest.getGender());
        user.setPhonenumber(signUpRequest.getPhonenumber());
        user.setEmail(signUpRequest.getEmail());
        user.setRole(WebSecurityConfig.USER);
        return user;
    }
}
