import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
 qid: any;
 qtitle: any;
  questions=[{
    questId:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
    qid:'',
    title:'',
    }
    }];
  constructor(private _route:ActivatedRoute,private _question:QuestionService) {}
ngOnInit():void
{
  this.qid=this._route.snapshot.params['qid'];
  this.qtitle=this._route.snapshot.params['qtitle'];
  this._question.getQuestionOfQuiz(this.qid).subscribe((data:any)=>{
    console.log(data);
    this.questions=data;
  },(error)=>{
    console.log(error);
  }
  );
}
deleteQuestion(qid:any)
{
  Swal.fire({
    icon:'info',
    showCancelButton:true,
    confirmButtonText:'Delete',
    title:'Are you are sure, to delete this question',
  }).then((result)=>{
    if(result.isConfirmed)
    {
      this._question.deleteQuestion(qid).subscribe(
        (data)=>{
          Swal.fire('Success','Question deleted successfully','success');
          this.questions=this.questions.filter((q)=>q.questId!=qid);
         
    },
    (error)=>{
      Swal.fire('Error','Error in deleting data','error');
    });
  };
});
}

}
