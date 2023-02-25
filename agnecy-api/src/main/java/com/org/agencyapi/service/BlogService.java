package com.org.agencyapi.service;

import com.org.agencyapi.model.Blog;

import java.util.List;

public interface BlogService {

    List<Blog> getOrders();

    List<Blog> getOrdersContainingText(String text);

    Blog validateAndGetOrder(String id);

    Blog saveOrder(Blog blog);

    void deleteOrder(Blog blog);
}
