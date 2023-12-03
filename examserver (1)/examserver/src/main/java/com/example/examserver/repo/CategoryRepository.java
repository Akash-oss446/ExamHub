package com.example.examserver.repo;

import com.example.examserver.model.exam.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository  extends JpaRepository<Category,Long> {
}
