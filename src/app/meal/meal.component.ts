import { Component, OnInit } from '@angular/core';
import {Meal} from '../model/Meal';
import {MealWeek} from '../model/MealWeek';
import {DataService} from '../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  date : Date;
  type : number;
  mealWeek : MealWeek;
  types : Object[];
  meals : Meal[];
  mealId : number;
  
  constructor(private dataService : DataService) { 
  }

  ngOnInit() {
    this.type = 1;
    this.types = [{"Value":1, "label" : "Breckfast"}, {"Value":2, "label" : "Lunch"}];
    this.mealWeek = new MealWeek();
    this.mealWeek.recDate =  moment().format('YYYY-MM-DD');
    this.mealWeek.recDateCre = new Date();
    this.getMealsByType(this.type);
  }

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
        alert("Meal is Required!");
    }else{
    this.dataService.addDaylyMeal(this.mealWeek).subscribe(
                response => {
                  this.mealWeek = response;
                },
                error => {
                  alert(error);
                }
              );
    }
  }

  onSelect(value : number){
    this.getMealsByType(value);
  }

  onSelectMeal(value : number){
    this.mealWeek.recId = value;
  }

}
