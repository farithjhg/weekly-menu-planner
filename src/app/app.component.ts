import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public userName : string;
  public avatar : string = "assets/img/avatar.png";
  public isLoggedIn : boolean;

  constructor(private router: Router){
    this.userName = localStorage.getItem('user');
    let authToken = localStorage.getItem('token');
    
    if(authToken != null && !this.isTokenExpired()){
      console.log("Successfully Logged in.");
      this.isLoggedIn = true;
    }else{
      console.log("Not Logged in.");
      this.isLoggedIn = false;
      this.router.navigate(['login']);
    }
  }

  logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('expires_in');
      this.isLoggedIn = false;
      this.router.navigate(['login']);
  }

  isTokenExpired() : Boolean {
    let expires_in = localStorage.getItem('expires_in');
    if(expires_in == null)
       return true;

    return Math.round(new Date().getTime()/1000.0) > new Number(expires_in)  ;
   }  


  ngOnInit() {
  }

}
