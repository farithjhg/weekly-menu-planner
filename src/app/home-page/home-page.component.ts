import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LoginService } from "../services/login.service";
import {ItemMenu} from '../model/ItemMenu'
import {PanelModule} from 'primeng/primeng';
import {Meal} from '../model/Meal';
import {MealWeek} from '../model/MealWeek';
import {Note} from '../model/Note';
import {DataService} from '../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public error : string;
  private itemMenu : ItemMenu[];
  private visibleDialog : boolean = false;
  date : Date;
  type : number = 1;
  mealWeek : MealWeek;
  types : Object[];
  meals : Meal[];
  mealId : number;
  edit : boolean = false;
  noteDialog : boolean = false;
  note : Note;
  description : string;
  noteValue : string;

  constructor(private router: Router, private dataService : DataService){
    let authToken = localStorage.getItem('token');
    
    if(authToken != null && !this.isTokenExpired()){
      console.log("Successfully Logged in.");
    }else{
      console.log("Not Logged in.");
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.getMenu();
  }
  
  isTokenExpired() : Boolean {
    let expires_in = localStorage.getItem('expires_in');
    if(expires_in == null)
       return true;

    return Math.round(new Date().getTime()/1000.0) > new Number(expires_in)  ;
   }  

  /**
   * Close the Note Dialog
   */ 
  closeNoteDialog(){
    this.noteDialog = false;
    this.note = null;
  }


  /**
   * Show the Notes Dialog
   */
  addNoteDialog(rwId:number, note : string, idNot : number){
    this.noteDialog = true;
    this.note = new Note();
    this.note.dateCre = new Date();
    this.note.rwId = rwId;
    this.note.id = idNot;
    this.edit = idNot != null;
    this.noteValue = note;
    this.note.description = this.noteValue;
  }

/**
 * Update the Note with status DONE
 */
  doneNote(){
      this.note.done = 1;
      this.dataService.updateNote(this.note).subscribe(
                  response => {
                    this.noteDialog = false;
                    this.closeNoteDialog();
                    this.getMenu();
                  },
                  error => {
                    let errorObj : TokenError = JSON.parse(error._body.toString());
                    if(errorObj.error=='invalid_token'){
                      this.router.navigate(['login']);
                    }
                    this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
                    console.log(this.error);
                  }
                );    
  }
  
  /**
   * Save notes
   */
  saveNote(){
    this.note.description = this.noteValue;
    if(this.edit){
      this.dataService.updateNote(this.note).subscribe(
                  response => {
                    this.noteDialog = false;
                    this.closeNoteDialog();
                    this.getMenu();
                  },
                  error => {
                    let errorObj : TokenError = JSON.parse(error._body.toString());
                    if(errorObj.error=='invalid_token'){
                      this.router.navigate(['login']);
                    }
                    this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
                    console.log(this.error);
                  }
                );
    }else{
      this.dataService.addNote(this.note).subscribe(
                  response => {
                    this.noteDialog = false;
                    this.closeNoteDialog();
                    this.getMenu();
                  },
                  error => {
                    let errorObj : TokenError = JSON.parse(error._body.toString());
                    if(errorObj.error=='invalid_token'){
                      this.router.navigate(['login']);
                    }
                    this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
                    console.log(this.error);
                  }
                );
    }
  }
  /**
   * Get Meals by Type
   * @param type 
   */
  getMealsByType(type : number){
        this.dataService.getMealsByType(type).subscribe(
                       (response:Array<Meal>) => {
                         this.meals = response;
                       },
                       error => {
                         let errorObj : TokenError = JSON.parse(error._body.toString());
                         if(errorObj.error=='invalid_token'){
                           this.router.navigate(['login']);
                         }
                         this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
                         console.log(this.error);
                       }
                     );   

  }  
  saveMeal(){
    if(this.mealWeek.recId == null){
        alert('Meal is Required!');
    }else{
      if(this.edit){
        this.dataService.updateDaylyMeal(this.mealWeek).subscribe(
                    response => {
                      this.visibleDialog = false;
                      this.getMenu();
                    },
                    error => {
                      let errorObj : TokenError = JSON.parse(error._body.toString());
                      if(errorObj.error=='invalid_token'){
                        this.router.navigate(['login']);
                      }
                      this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
                      console.log(this.error);
                    }
                  );
      }else{
        this.dataService.addDaylyMeal(this.mealWeek).subscribe(
                    response => {
                      this.mealWeek = response;
                      this.visibleDialog = false;
                      this.getMenu();
                    },
                    error => {
                      let errorObj : TokenError = JSON.parse(error._body.toString());
                      if(errorObj.error=='invalid_token'){
                        this.router.navigate(['login']);
                      }
                      this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
                      console.log(this.error);
                    }
                  );

      }
    }
  }

  onSelect(value : number){
    this.getMealsByType(value);
  }

  onSelectMeal(value : number){
    this.mealWeek.recId = value;
  }

  showDialog(){
    this.visibleDialog = true;
    this.mealWeek = new MealWeek();
    this.mealWeek.recDate = moment().format('YYYY-MM-DD');
    this.mealWeek.recDateCre = new Date();
    this.edit = false;
    this.getMealsByType(this.type);
  }

  editDialog(id:number, recId : number, 
      type : number, date:string){
    this.mealId = recId;
    this.visibleDialog = true;
    this.mealWeek = new MealWeek();
    this.type = type;
    this.mealWeek.rwId = id;
    this.mealWeek.recId = recId;
    this.mealWeek.recDate = date;
    this.edit = true;
    this.getMealsByType(type);
  }

  closeDialog(){
    this.visibleDialog = false;
    this.mealWeek = null;
  }

  getMenu(){
    this.dataService.getMenu().subscribe(
                       response => {
                         this.itemMenu = response;
                       },
                       error => {
                         let errorObj : TokenError = JSON.parse(error._body.toString());
                         if(errorObj.error=='invalid_token'){
                           this.router.navigate(['login']);
                         }
                         this.error = 'Error: '+errorObj.error+' ['+errorObj.error_description+']';
                         console.log(this.error);
                       }
                     );   
  }    
}


interface TokenError {
    error: string;
    error_description: string;
}