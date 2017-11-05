import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public email : string;
  public password : string;
  public error: any;
  constructor(private loginService : LoginService, private router: Router) {}

  ngOnInit() {
  }
  
  loginWithEmail(event){
    event.preventDefault();
    this.loginService.login(this.email, this.password).subscribe(
      response => {
        let token = response.access_token;
        if(token != null){
          localStorage.setItem('user', this.email);
          localStorage.setItem('token', response.access_token);
          var expires_in : number = <number>response.expires_in;
          var milisec : number = Math.round(new Date().getTime()/1000.0) + expires_in;
          
          localStorage.setItem('expires_in', milisec+"");
          this.router.navigate(['']);
        }
      },
      error => {
        console.log(error._body);
        if (error._body instanceof ProgressEvent ) {
          console.log("ProgressEvent");
          
          this.error = 'Error: Services are down!';
        }else{
          let errorObj : MyError = JSON.parse(error._body.toString());
          this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
          console.log(this.error);
        }
      });
  }

  loginWithEmailAndPassword(event, email, password){
    event.preventDefault();
    this.loginService.login(email, password).subscribe(
      response => {
        let token = response.access_token;
        if(token != null){
          localStorage.setItem('user', email);
          localStorage.setItem('token', response.access_token);
          var expires_in : number = <number>response.expires_in;
          var milisec : number = Math.round(new Date().getTime()/1000.0) + expires_in;
          
          localStorage.setItem('expires_in', milisec+"");
          this.router.navigate(['']);
        }
      },
      error => {
        console.log(error._body);
        if (error._body instanceof ProgressEvent ) {
          console.log("ProgressEvent");
          
          this.error = 'Error: Services are down!';
        }else{
          let errorObj : MyError = JSON.parse(error._body.toString());
          this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
          console.log(this.error);
        }
      });
  }
  
}


interface MyError {
    error: string;
    error_description: string;
}