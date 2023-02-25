package com.org.agencyapi.repository;

import com.org.agencyapi.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, String> {

    List<Blog> findAllByOrderByCreatedAtDesc();

    List<Blog> findByIdContainingOrDescriptionContainingOrderByCreatedAt(String id, String description);
}
