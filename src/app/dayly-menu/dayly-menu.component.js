"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DaylyMenuComponent = (function () {
    function DaylyMenuComponent(dataService) {
        this.dataService = dataService;
    }
    DaylyMenuComponent.prototype.ngOnInit = function () {
        this.meal.typeRec = 2;
        this.meal.weekend = 0;
    };
    DaylyMenuComponent.prototype.saveMeal = function () {
        this.mealSaved = this.dataService.addRecipe(this.meal);
        console.log("Meal Saved !" + this.mealSaved);
        alert("Meal Saved !");
    };
    DaylyMenuComponent.prototype.onSelect = function (value) {
        console.log('change ' + value);
    };
    DaylyMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-dayly-menu',
            templateUrl: './dayly-menu.component.html',
            styleUrls: ['./dayly-menu.component.css']
        })
    ], DaylyMenuComponent);
    return DaylyMenuComponent;
}());
exports.DaylyMenuComponent = DaylyMenuComponent;
