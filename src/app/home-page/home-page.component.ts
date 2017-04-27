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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private itemMenu : ItemMenu[];
  private visibleDialog : boolean = false;
  date : Date;
  type : number;
  mealWeek : MealWeek;
  types : Object[];
  meals : Meal[];
  mealId : number;
  edit : boolean = false;
  noteDialog : boolean = false;
  note : Note;
  description : string;
  noteValue : string;

  constructor(public router: Router ,private loginService: LoginService, private dataService : DataService) {}

  ngOnInit() {
    this.type = 1;
    this.types = [{"Value":1, "label" : "Breckfast"}, {"Value":2, "label" : "Lunch"}];
    this.mealWeek = new MealWeek();
    this.mealWeek.recDate = new Date();
    this.mealWeek.recDateCre = new Date();
    
    this.loginService.login().subscribe(
                       response => {
                          localStorage.setItem('token', response.access_token);
                          this.getMenu();
                       },
                       error => {
                        alert(error);
                       }
                     );
  }
  
  closeNoteDialog(){
    this.noteDialog = false;
    this.note = null;
  }

  addNoteDialog(rwId:number, note : string, idNot : number){
    console.log('IdNot', idNot);
    this.noteDialog = true;
    this.note = new Note();
    this.note.dateCre = new Date();
    this.note.rwId = rwId;
    this.note.id = idNot;
    this.edit = idNot != null;
    this.noteValue = note;
    this.note.description = this.noteValue;
  }

  doneNote(){
      this.note.done = 1;
      this.dataService.updateNote(this.note).subscribe(
                  response => {
                    this.noteDialog = false;
                    this.closeNoteDialog();
                    this.getMenu();
                  },
                  error => {
                    alert(error);
                  }
                );    
  }
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
                    alert(error);
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
                    alert(error);
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
                        alert(error);
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
                      this.mealWeek = response;
                      this.visibleDialog = false;
                      this.getMenu();
                    },
                    error => {
                      alert(error);
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
                      alert(error);
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
    this.edit = false;
    this.getMealsByType(this.type);
  }

  editDialog(id:number, recId : number, 
      type : number, date:Date){
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
    this.loginService.getMenu().subscribe(
                       response => {
                         this.itemMenu = response;
                       },
                       error => {
                        alert(error);
                       }
                     );   
  }

}
