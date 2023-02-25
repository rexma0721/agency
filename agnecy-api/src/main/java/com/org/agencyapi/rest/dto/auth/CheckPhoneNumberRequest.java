package com.org.agencyapi.rest.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CheckPhoneNumberRequest {

    @Schema(example = "+19142652104")
    @NotBlank
    private String phonenumber;

}
