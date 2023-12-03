package com.example.examserver.service;

import com.example.examserver.model.exam.Question;
import com.example.examserver.model.exam.Quiz;

import java.util.Set;

public interface QuestionService {
    public Question addQuestion(Question question);
    public  Question updateQuestion(Question question);
    public Set<Question> getQuestions();
    public  Question getQuestion(Long questionId);
    public Set<Question> getQuestionofQuiz(Quiz quiz);
    public void  deleteQuestion(Long quesId);
}
