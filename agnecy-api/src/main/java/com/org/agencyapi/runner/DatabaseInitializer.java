package com.org.agencyapi.runner;

import com.org.agencyapi.model.User;
import com.org.agencyapi.security.WebSecurityConfig;
import com.org.agencyapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
        });
        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
//            new User("admin", "admin", "Admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
//            new User("user", "user", "User", "user@mycompany.com", WebSecurityConfig.USER)
    );
}
