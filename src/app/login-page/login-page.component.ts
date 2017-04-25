import { Component, OnInit } from '@angular/core';
import {FbService} from "../services/fb.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public error: any;
  constructor(public afService: FbService, private router: Router) {}
  
  loginWithGoogle() {
    this.afService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
      this.afService.addUserInfo();
      this.router.navigate(['home']);
    })
  }
  
  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['home']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }

  ngOnInit() {
  }

}
