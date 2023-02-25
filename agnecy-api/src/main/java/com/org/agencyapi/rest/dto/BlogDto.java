package com.org.agencyapi.rest.dto;

import java.time.ZonedDateTime;

public record BlogDto(String id, String description, BlogDto.UserDto user,
                      ZonedDateTime createdAt) {

    public record UserDto(String username) {
    }
}