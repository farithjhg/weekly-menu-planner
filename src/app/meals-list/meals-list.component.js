"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Meal_1 = require('../model/Meal');
var MealsListComponent = (function () {
    function MealsListComponent(dataService) {
        this.dataService = dataService;
    }
    MealsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getMealsList().subscribe(function (response) {
            _this.meals = response;
        }, function (error) {
            alert(error);
        });
    };
    MealsListComponent.prototype.onRowSelect = function (event) {
        this.new = false;
        this.displayDialog = true;
    };
    MealsListComponent.prototype.deleteMeal = function (id) {
        console.log("Delete " + id);
    };
    MealsListComponent.prototype.save = function () {
        console.log("edit");
    };
    MealsListComponent.prototype.showDialog = function () {
        this.new = true;
        this.meal = new Meal_1.Meal();
        this.displayDialog = true;
    };
    MealsListComponent = __decorate([
        core_1.Component({
            selector: 'app-meals-list',
            templateUrl: './meals-list.component.html',
            styleUrls: ['./meals-list.component.css']
        })
    ], MealsListComponent);
    return MealsListComponent;
}());
exports.MealsListComponent = MealsListComponent;
