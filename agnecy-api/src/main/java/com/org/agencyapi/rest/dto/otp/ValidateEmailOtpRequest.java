package com.org.agencyapi.rest.dto.otp;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ValidateEmailOtpRequest {

    @Schema(example = "user@gmail.com")
    @NotBlank
    @Email
    private String email;
    @Schema(example = "123456")
    @NotNull
    private Integer code;
}
