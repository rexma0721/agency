package com.org.agencyapi.mapper;

import com.org.agencyapi.model.User;
import com.org.agencyapi.rest.dto.UserDto;
import org.mapstruct.Mapper;
import org.springframework.context.annotation.Configuration;

@Configuration
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);
}