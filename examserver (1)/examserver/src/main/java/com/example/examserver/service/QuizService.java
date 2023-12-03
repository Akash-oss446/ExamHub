package com.example.examserver.service;

import com.example.examserver.model.exam.Category;
import com.example.examserver.model.exam.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getQuizzes();
    public Quiz getQuiz(Long quizId);
    public void deleteQuiz(Long quizId);

    public List<Quiz> getQuizzesofCategory(Category category);
    public List<Quiz> getActiveQuizzes();
    public  List<Quiz> getActiveQuizzesofCategory(Category c);
}
