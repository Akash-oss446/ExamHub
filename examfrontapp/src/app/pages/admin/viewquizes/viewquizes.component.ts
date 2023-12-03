import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewquizes',
  templateUrl: './viewquizes.component.html',
  styleUrls: ['./viewquizes.component.css']
})
export class ViewquizesComponent implements OnInit {
  
quizzes=[
  {
    qid:2,
    title:'Basic Java Quiz',
    description:'The Quiz contains 20 questions of 40 Marks The Questions will related basic of java programming language(OOPS concepts).',
    maxMarks:'40',
    numberofquestions:'20',
    active:'',
    subtitle:'Programming',
  },
];
constructor(private _quiz:QuizService) {}
  ngOnInit(): void {
      this._quiz.quizzes().subscribe(
       (data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
      },
      (error:any)=>
      {
        console.log(error);
        Swal.fire('Error !',"Error in Loading data!",'error');
      }
      );
  }
  deleteQuiz(qid:any)
  {
    Swal.fire({
      icon:'info',
      title:'Are You are Sure',
      confirmButtonText:'Delete',
      showCancelButton:true,

    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._quiz.deleteQuiz(qid).subscribe(
          (data)=>{
            this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid);
            Swal.fire('Success','Quiz Deleted','success');},
          (error)=>{Swal.fire('Error','Quiz is not Deleted','error');}
         )
      }
    }
    )
  }
}
    
    
