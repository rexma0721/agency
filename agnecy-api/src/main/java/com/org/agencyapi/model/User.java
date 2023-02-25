package com.org.agencyapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "phonenumber")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String gender;
    private String phonenumber;
    private boolean email_verified = false;
    private String password;
    private String email;
    private String role;

    private boolean remember_me = false;
    private ZonedDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Blog> orders = new ArrayList<>();

    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }
    public User(String firstname, String lastname, String username, String gender, String phonenumber, String password, String email, String role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.gender = gender;
        this.phonenumber = phonenumber;
        this.password = password;
        this.email = email;
        this.role = role;
    }
}
