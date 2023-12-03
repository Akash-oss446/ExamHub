import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
catId:any;
quizzes:any
 constructor(private _route:ActivatedRoute,private _quiz:QuizService)
 {}
 ngOnInit():void {
  this.catId=this._route.snapshot.params['catId'];
  this._route.params.subscribe((params)=>{
   this.catId=params['catId'];
   if(this.catId==0)
  {
    console.log("Load all quiz");
    this._quiz.getActiveQuizzes().subscribe(
      (data)=>
      {
       this.quizzes=data; 
       console.log(data);
      },
      (error)=>
      {
        Swal.fire('error','Error in loading data','error');
        console.log(error);
      }
    );
  }
  else
  {
    console.log('Load Specific quiz');
    this._quiz.getActiveQuizzesofCategory(this.catId).subscribe(
      (data:any)=>
      {
        this.quizzes=data;
      },
      (error)=>{
        Swal.fire('Error','Error in loading quiz ','error');
       console.log(error);
      }
      );
  }
  console.log(this.catId);
  })
  
 }
}
