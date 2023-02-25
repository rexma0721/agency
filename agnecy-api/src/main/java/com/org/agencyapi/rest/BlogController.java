package com.org.agencyapi.rest;

import com.org.agencyapi.mapper.OrderMapper;
import com.org.agencyapi.model.Blog;
import com.org.agencyapi.rest.dto.BlogDto;
import com.org.agencyapi.security.CustomUserDetails;
import com.org.agencyapi.service.BlogService;
import com.org.agencyapi.service.UserService;
import com.org.agencyapi.model.User;
import com.org.agencyapi.rest.dto.CreateOrderRequest;
import com.org.agencyapi.config.SwaggerConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final UserService userService;
    private final BlogService blogService;
    private final OrderMapper orderMapper;

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<BlogDto> getBlogs(@RequestParam(value = "text", required = false) String text) {
        List<Blog> blogs = (text == null) ? blogService.getOrders() : blogService.getOrdersContainingText(text);
        return blogs.stream()
                .map(orderMapper::toOrderDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public BlogDto createBlog(@AuthenticationPrincipal CustomUserDetails currentUser,
                              @Valid @RequestBody CreateOrderRequest createOrderRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Blog blog = orderMapper.toOrder(createOrderRequest);
        blog.setId(UUID.randomUUID().toString());
        blog.setUser(user);
        return orderMapper.toOrderDto(blogService.saveOrder(blog));
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public BlogDto deleteBlogs(@PathVariable UUID id) {
        Blog blog = blogService.validateAndGetOrder(id.toString());
        blogService.deleteOrder(blog);
        return orderMapper.toOrderDto(blog);
    }
}
