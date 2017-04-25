"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MealComponent = (function () {
    function MealComponent() {
    }
    MealComponent.prototype.ngOnInit = function () {
        this.type = "2";
        this.mealWeek.recDate = new Date();
    };
    MealComponent.prototype.saveMeal = function () {
        console.log(this.mealWeek);
    };
    MealComponent.prototype.onSelect = function (value) {
        console.log('change ' + value);
    };
    MealComponent = __decorate([
        core_1.Component({
            selector: 'app-meal',
            templateUrl: './meal.component.html',
            styleUrls: ['./meal.component.css']
        })
    ], MealComponent);
    return MealComponent;
}());
exports.MealComponent = MealComponent;
