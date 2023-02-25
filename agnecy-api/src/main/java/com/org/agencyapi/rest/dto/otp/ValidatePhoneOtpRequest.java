package com.org.agencyapi.rest.dto.otp;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ValidatePhoneOtpRequest {

    @Schema(example = "+19142652104")
    @NotBlank
    @Email
    private String phonenumber;
    @Schema(example = "123456")
    @NotNull
    private Integer code;
}
