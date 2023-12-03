import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  [x: string]: any;

  constructor(private http:HttpClient) { }
  //current user;
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }
   //generate token
   public generateToken(logindata:any)
   {
      return this.http.post(`${baseUrl}/generate-token`,logindata);
   }
   //login user:set token in localStorage
   public loginUser(token:any)
   {
    localStorage.setItem('token',token);
    return true;
   }
   //islogin
   public isLoggedin()
   {
    let tokenstr=localStorage.getItem("token")
    if(tokenstr==undefined || tokenstr=='' || tokenstr==null)
    {
      return false;
    }
    else
    {
      return true;
    }
   }
   //logout 
   public logout()
   {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
   }

   //get token 
   public getToken(){
    return localStorage.getItem('token');
   }
   //set userdetails
   public setUser(user:any)
   {
     localStorage.setItem("user",JSON.stringify(user));
   }
   public getUser()
   {
    let userStr=localStorage.getItem('user');
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
   }
   public getUserRole()
   {
    let user=this.getUser()
    return user.authorities[0].authority;
   }
}

