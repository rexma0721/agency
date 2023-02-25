package com.org.agencyapi.rest.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class SignUpRequest {

    @Schema(example = "user3")
    @NotBlank
    private String username;

    @Schema(example = "user3")
    @NotBlank
    private String password;

    @Schema(example = "User3")
    @NotBlank
    private String firstname;

    @Schema(example = "User3")
    @NotBlank
    private String lastname;

    @Schema(example = "man")
    @NotBlank
    private String gender;

    @Schema(example = "+19142652104")
    @NotBlank
    private String phonenumber;


    @Schema(example = "user3@mycompany.com")
    @NotBlank
    @Email
    private String email;
}
