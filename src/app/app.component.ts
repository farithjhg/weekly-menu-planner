import { Component } from '@angular/core';
import {FbService} from "./services/fb.service";
import {Router} from "@angular/router";
import { LoginService } from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;
  
  constructor(public afService: FbService, private router: Router, private loginService: LoginService) {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          console.log("Successfully Logged in.");
          // Set the Display Name and Email so we can attribute messages to them
          if(auth.google) {
            this.afService.displayName = auth.google.displayName;
            this.afService.email = auth.google.email;
          }
          else {
            this.afService.displayName = auth.auth.email;
            this.afService.email = auth.auth.email;
          }
          
          let authToken = localStorage.getItem('token');
    
          if(authToken == null || this.isTokenExpired()){          
              this.loginService.login().subscribe(
                                 response => {
                                    localStorage.setItem('token', response.access_token);
                                    var expires_in : number = <number>response.expires_in;
                                    var milisec : number = Math.round(new Date().getTime()/1000.0) + expires_in;
                                    
                                    localStorage.setItem('expires_in', milisec+"");
                                 },
                                 error => {
                                  alert(error);
                                 }
                               );
            
          }
          
          this.isLoggedIn = true;
          this.router.navigate(['home']);
        }
      }
    );
  }
  
  isTokenExpired() : Boolean {
    let expires_in = localStorage.getItem('expires_in');
    if(expires_in == null)
       return true;

    return Math.round(new Date().getTime()/1000.0) > new Number(expires_in)  ;
  }  
  
  logout() {
    this.afService.logout();
  }
}