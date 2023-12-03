import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { of } from 'rxjs'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata={
    username:'',
    password:'',
  }
 constructor(private snack:MatSnackBar,private login:LoginService) {}
 ngOnInit(): void {}
     formSubmit()
     {
       console.log('login btn');
       if(this.logindata.username.trim()=='' || this.logindata.username==null)
       {
           this.snack.open("Username is Required !!",'',{
            duration:3000,
           });
           return;
       }
       if(this.logindata.password.trim()=='' || this.logindata.password==null)
       {
           this.snack.open("Password is Required !!",'',{
            duration:3000,
           });
           return;
       }
       //request to server to generate token
       this.login.generateToken(this.logindata).subscribe((data:any)=>{
          console.log("success");
          console.log(data);
          this.login.loginUser(data.token);
          this.login.getCurrentUser().subscribe(
            (user:any)=>
            {
              this.login.setUser(user);
              console.log(user);
              if(this.login.getUserRole()=="Admin")
              {
                 window.location.href='/admin';
              }
              else if(this.login.getUserRole()=='Normal User')
              {
                window.location.href='/user-dashboard/0';
              }
              else
              {
                this.login.logout();
              }
              //redirect ...ADMIN :admin-dashboard
              //redirect ...NORMAL:normal-dashboard
            });
           
        },
        (error)=>{
          console.log("Error !!"); 
          console.log(error);  
          this.snack.open("Invalid Credentials !! Try Again",'',{
            duration:3000,
          });
        });
     }
 }

