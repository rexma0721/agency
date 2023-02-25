package com.org.agencyapi.rest.dto.otp;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class GeneratePhoneOtpRequest {

    @Schema(example = "+19142652104")
    @NotBlank
    private String phonenumber;

}
