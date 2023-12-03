package com.example.examserver.controller;

import com.example.examserver.model.exam.Question;
import com.example.examserver.model.exam.Quiz;
import com.example.examserver.service.QuestionService;
import com.example.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    private QuestionService service;
    @Autowired
    private QuizService quizservice;
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question)
    {
        return ResponseEntity.ok(this.service.addQuestion(question));
    }
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question)
    {
        return ResponseEntity.ok(this.service.updateQuestion(question));
    }
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?>  getQuestionsofQuiz(@PathVariable("qid") Long qid)
    {
        /*Quiz quiz=new Quiz();
        quiz.setQid(qid);
        Set<Question> questionofQuiz=this.service.getQuestionofQuiz(quiz);
        return ResponseEntity.ok(questionofQuiz);*/
        Quiz quiz=this.quizservice.getQuiz(qid);
        Set<Question> questions=quiz.getQuestions();
        List list=new ArrayList(questions);
        if(list.size()>Integer.parseInt(quiz.getNumberofquestions())){
            list=list.subList(0,Integer.parseInt(quiz.getNumberofquestions()+1));
        }
        Collections.shuffle(list);
        return ResponseEntity.ok(list);

    }
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?>  getQuestionsofQuizAdmin(@PathVariable("qid") Long qid)
    {
        Quiz quiz=new Quiz();
        quiz.setQid(qid);
        Set<Question> questionofQuiz=this.service.getQuestionofQuiz(quiz);
        return ResponseEntity.ok(questionofQuiz);
        //return ResponseEntity.ok(list);

    }
   @GetMapping("/{questId}")
    public Question get(@PathVariable("questId") Long questId)
   {
       return this.service.getQuestion(questId);
   }
   @DeleteMapping("/{questId}")
    public void delete(@PathVariable("questId") Long questId)
   {
        this.service.deleteQuestion(questId);
   }
}
