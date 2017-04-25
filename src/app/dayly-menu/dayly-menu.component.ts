import { Component, OnInit } from '@angular/core';
import {Meal} from '../model/Meal';
import {MealWeek} from '../model/MealWeek';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-dayly-menu',
  templateUrl: './dayly-menu.component.html',
  styleUrls: ['./dayly-menu.component.css']
})
export class DaylyMenuComponent implements OnInit {
  meal : Meal;
  mealSaved : Meal;
  constructor(private dataService : DataService) { 
  }

  ngOnInit() {
    this.meal.typeRec = 2;
    this.meal.weekend = 0;
  }
  
  saveMeal(){
    //this.mealSaved = this.dataService.addRecipe(this.meal);
    console.log("Meal Saved !" + this.mealSaved);
    alert("Meal Saved !");
  }

  onSelect(value : any){
    console.log('change '+value);
  }

}