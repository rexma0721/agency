package com.org.agencyapi.service;

import com.org.agencyapi.model.Blog;
import com.org.agencyapi.repository.BlogRepository;
import com.org.agencyapi.exception.OrderNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    @Override
    public List<Blog> getOrders() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public List<Blog> getOrdersContainingText(String text) {
        return blogRepository.findByIdContainingOrDescriptionContainingOrderByCreatedAt(text, text);
    }

    @Override
    public Blog validateAndGetOrder(String id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(String.format("Order with id %s not found", id)));
    }

    @Override
    public Blog saveOrder(Blog blog) {
        return blogRepository.save(blog);
    }

    @Override
    public void deleteOrder(Blog blog) {
        blogRepository.delete(blog);
    }
}
