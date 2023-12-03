package com.example.examserver.controller;

import com.example.examserver.model.exam.Category;
import com.example.examserver.model.exam.Quiz;
import com.example.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;
    @PostMapping("/")
    public ResponseEntity<Quiz> add(@RequestBody Quiz quiz)
    {
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }
    @PutMapping("/")
    public ResponseEntity<Quiz> update(@RequestBody Quiz quiz)
    {
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }
    @GetMapping("/")
    public ResponseEntity<?> quizes()
    {
        return  ResponseEntity.ok(this.quizService.getQuizzes());
    }
    @GetMapping("/{qid}")
    public Quiz quiz(@PathVariable("qid") Long qid)
    {
        return this.quizService.getQuiz(qid);
    }
    @DeleteMapping("/{qid}")
    public void delete(@PathVariable("qid") Long qid)
    {
        this.quizService.deleteQuiz(qid);
    }
    @GetMapping("/category/{cid}")
    public List<Quiz> getQuizzesCategory(@PathVariable("cid") long cid)
    {
        Category category=new Category();
        category.setCid(cid);
        return this.quizService.getQuizzesofCategory(category);
    }
    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes()
    {
        return this.quizService.getActiveQuizzes();
    }
    @GetMapping("/category/active/{cid}")
    public List<Quiz> getActiveQuizzes(@PathVariable("cid") long cid)
    {
        Category category=new Category();
        category.setCid(cid);
        return this.quizService.getActiveQuizzesofCategory(category);
    }

}
