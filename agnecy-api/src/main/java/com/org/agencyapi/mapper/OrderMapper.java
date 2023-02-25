package com.org.agencyapi.mapper;

import com.org.agencyapi.model.Blog;
import com.org.agencyapi.rest.dto.BlogDto;
import com.org.agencyapi.rest.dto.CreateOrderRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.context.annotation.Configuration;

@Configuration
@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Blog toOrder(CreateOrderRequest createOrderRequest);

    @Mapping(target = "createdAt", dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    BlogDto toOrderDto(Blog blog);
}