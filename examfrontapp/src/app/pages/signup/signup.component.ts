import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
constructor(private userService:UserService,private snack:MatSnackBar) {}
public user={
  firstname:'',
  email:'',
  lastname:'',
  phone:'',
  username:'',
  password:'',
};
ngOnInit():void{}
formSubmit()
{
  if(this.user.firstname==''||this.user.lastname==''||this.user.email==''||this.user.phone==''||this.user.username==''||this.user.password=='')
  {
    this.snack.open("All Fields are Required!!",'',{
      duration:3000,
      verticalPosition:'top',
    });
     
    return;
  }
  this.userService.addUser(this.user).subscribe(
    (data:any)=>{
       console.log(data);
       Swal.fire('Success','User Registered Successfully','success')
    },
    (error)=>{
       console.log(error);
       this.snack.open('Something went wrong!!','',{
        duration:3000,
        verticalPosition:'top',
       });
    }
  );
  
}

}
