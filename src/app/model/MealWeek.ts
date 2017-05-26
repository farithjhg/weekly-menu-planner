import {Meal} from '../model/Meal';
import { Component} from '@angular/core';

export class MealWeek {
    public rwId: number; 
    public recDate: string; 
    public recWith: string;
    public recDateCre: Date;
    public recId : number;
    public meal: Meal;

    constructor(){
        }
}