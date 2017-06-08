import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  public error: any;
  constructor(private router: Router) { }
	
	//registers the user and logs them in
  register(event, name, email, password) {
    event.preventDefault();
  }
  
  ngOnInit() {
  }

}
