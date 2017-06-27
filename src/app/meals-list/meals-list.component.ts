import { Component, OnInit } from '@angular/core';
import {Meal} from '../model/Meal';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {
  meals : Meal[];
  displayDialog: boolean;
  selected : Meal;
  new : boolean;
  meal : Meal;
  showMessage : boolean = false;
  message : string;
  public error : String;
  
  constructor(private dataService : DataService) { 
    
  }

  ngOnInit() {
    this.dataService.getMealsList().subscribe(
                       (response:Array<Meal>) => {
                         this.meals = response;
                       },
                       error => {
                        this.error = error;
                       }
                     );   
  }
  
  onRowSelect(event) {
    this.selected = event.data;
    this.new  = false;
    this.meal = this.meals[this.findSelectedIndex()];
    this.displayDialog = true;
  }

  deleteMeal(id:Number){
    this.dataService.deleteRecipe(this.meal.idRec).subscribe(
                       response => {
                        this.message = "Entity Deleted!";
                        this.meals.splice(this.findSelectedIndex(), 1);
                        this.meal = null; 
                        this.displayDialog = false;
                        this.showMessage = true;
                       },
                       error => {
                        this.error = error._body;
                       }
                     );
    setTimeout(function() {
       this.showMessage = false;
    }, 3000);    

  }

  save(){
    this.message = "Entity Saved!";
    if(this.new){
      this.dataService.addRecipe(this.meal).subscribe(
                       response => {
                        this.meal.nameType = this.dataService.getNameType(this.meal.typeRec);
                        this.meal.weekendText = this.dataService.getTextSN(this.meal.weekend);
                        this.meals.push(this.meal);
                        this.displayDialog = false;
                        this.showMessage = true;
                        
                       },
                       error => {
                        this.error = error;
                       }
                     );  
    }else{
      this.dataService.updateRecipe(this.meal).subscribe(
                       response => {
                        this.displayDialog = false;
                        this.showMessage = true;
                       },
                       error => {
                        this.error = error._body;
                       }
                     );  
    }
    setTimeout(function() {
       this.showMessage = false;
    }, 3000);    
  }
  
  close(){
    this.displayDialog = false;
  }
  
  showDialog(){
    this.new = true;
    this.meal = new Meal();
    this.meal.typeRec = 2;
    this.meal.nameType = this.dataService.getNameType(this.meal.typeRec);
    this.meal.weekend = 0;
    this.meal.weekendText = this.dataService.getTextSN(this.meal.weekend);
    this.displayDialog = true;
  }
  
  onSelect(value : any){
    console.log('change '+value);
  }  
  
  findSelectedIndex(): number {
     return this.meals.indexOf(this.selected);
  }
}