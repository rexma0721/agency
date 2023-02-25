package com.org.agencyapi.service;

import com.org.agencyapi.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getUsers();

    Optional<User> getUserByUsername(String username);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    boolean hasUserWithPhone(String phonenumber);
    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

    void deleteUser(User user);
}
