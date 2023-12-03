package com.example.examserver.service.impl;

import com.example.examserver.model.exam.Question;
import com.example.examserver.model.exam.Quiz;
import com.example.examserver.repo.QuestionRepository;
import com.example.examserver.repo.QuizRepository;
import com.example.examserver.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
@Service
public class QuestionServiceimpl implements QuestionService {
@Autowired
private QuestionRepository questionRepository;
    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Set<Question> getQuestions() {
        return new HashSet<>(this.questionRepository.findAll());
    }

    @Override
    public Question getQuestion(Long questionId) {
        return this.questionRepository.findById(questionId).get();
    }

    @Override
    public Set<Question> getQuestionofQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long quesId) {
        Question question=new Question();
        question.setQuestId(quesId);
        this.questionRepository.delete(question);
    }
}
