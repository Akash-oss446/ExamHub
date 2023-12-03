import { LocationChangeListener, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrls: ['./startquiz.component.css']
})
export class StartquizComponent implements OnInit {
  qid:any;
  questions:any;
  marksgot=0;
  correctanswers=0;
  attempted=0;
  issubmit=false;
  timer:any;
  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService) {
  }
  
  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    this.loadQuestions();
  }
  loadQuestions()
  {
    this._question.getQuestionOfQuizfortest(this.qid).subscribe((data:any)=>
    {
     this.questions=data;
     console.log(this.questions)
     this.timer=this.questions.length*2*60;
     this.questions.forEach((q:any)=>{
      q['givenanswer']='';
     });
     this.starttimer();

    },
    (error)=>
    {
      console.log(error)
      Swal.fire('error','Error in loading questions','error')
    })
  }
 preventBackButton()
 {
  history.pushState(null,"null",location.href);
  this.locationSt.onPopState(()=>{
    history.pushState(null,"null",location.href);
 })
}
submitQuiz()
{
  Swal.fire({
    title: 'Do you want to Submit the Quiz?',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    denyButtonText: 'Donot Save',
    icon:'info'
  }).then((e)=>
  {
    if(e.isConfirmed)
    {
      this.evalQuiz();
    }
      });
}
starttimer()
{
 let t=window.setInterval(()=>{
    if(this.timer<=0)
    {
      this.evalQuiz();
      clearInterval(t);
    }
    else{
      this.timer--;
    }
  },1000)
}
getFormattedTime()
{
  let mn=Math.floor(this.timer/60);
  let ss=this.timer-mn*60
  return `${mn} min : ${ss} sec`;
}
evalQuiz()
{
  this.issubmit=true;
  this.questions.forEach((q: { givenanswer: any; answer: any; })=>{
    if(q.givenanswer==q.answer)
    {
         this.correctanswers++;
         let markssingle=this.questions[0].quiz.maxMarks/this.questions.length;
         this.marksgot+=markssingle;
    }
    if(q.givenanswer.trim()!='')
    {
      this.attempted++;
    }
    console.log("Correct Answers:"+this.correctanswers);
    console.log("Marks got"+this.correctanswers);
    console.log("Attempted"+this.attempted);
}
  )}
  printPDF()
  {
    window.print();
  }
}
