package com.example.examserver.repo;

import com.example.examserver.model.exam.Category;
import com.example.examserver.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Long> {
    public List<Quiz> findBycategory(Category category);
    public List<Quiz> findByActive(boolean b);
    public List<Quiz> findByCategoryAndActive(Category c,Boolean b);
}
