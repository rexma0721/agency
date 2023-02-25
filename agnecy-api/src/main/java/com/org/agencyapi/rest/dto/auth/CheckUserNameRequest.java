package com.org.agencyapi.rest.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CheckUserNameRequest {

    @Schema(example = "user")
    @NotBlank
    private String username;

}
