package com.org.agencyapi.rest.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class CheckEmailRequest {

    @Schema(example = "user@gmail.com")
    @NotBlank
    @Email
    private String email;

}
