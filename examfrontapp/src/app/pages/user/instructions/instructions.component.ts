import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid:any;
  quizzes:any;
 constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router) {}
 ngOnInit(): void {
   this.qid=this._route.snapshot.params['qid'];
   this._quiz.getQuiz(this.qid).subscribe(
    (data:any)=>{
      this.quizzes=data;
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error','Error in loading quiz data','error');
    }
   )
 }
 startQuiz()
 {
  Swal.fire({
    title: 'Do you want to Start the Quiz?',
    showCancelButton: true,
    confirmButtonText: 'Start',
    icon:'info'
    }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
    this._router.navigate(['/start/'+this.qid]);
 }
}
)
}
}
