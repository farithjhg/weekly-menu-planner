"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this._urlMenu = "https://weekly-menu-planner.herokuapp.com/rest/weeklymenu";
        this._urlMeals = "https://weekly-menu-planner.herokuapp.com/rest/recipes/";
        this._urlDayly = "https://weekly-menu-planner.herokuapp.com/rest/recipes/add";
        this._urlMealList = "https://weekly-menu-planner.herokuapp.com/rest/recipes/all";
    }
    DataService.prototype.getMenu = function () {
        var authToken = localStorage.getItem('token');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .get(this._urlMenu, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.addRecipe = function (body) {
        var authToken = localStorage.getItem('token');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this._urlDayly, body, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    DataService.prototype.getMealsByType = function (type) {
        var authToken = localStorage.getItem('token');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers });
        var URL = this._urlMeals + type;
        return this.http
            .get(URL, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getMealsList = function () {
        var _this = this;
        var authToken = localStorage.getItem('token');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers });
        var URL = this._urlMealList;
        return this.http
            .get(URL, options)
            .map(function (res) {
            console.log("res " + res);
            var myArray = res.json();
            for (var i = 0; i < myArray.length; i++) {
                var meal = myArray[i];
                meal.nameType = _this.getNameType(meal.typeRec);
                meal.weekendText =
                    meal.weekendText = _this.getTextSN(meal.weekend);
            }
            return myArray;
        })
            .catch(this.handleError);
    };
    DataService.prototype.getNameType = function (typeRec) {
        if (typeRec == 1) {
            return "Breackfast";
        }
        else if (typeRec == 2) {
            return "Lunch";
        }
        else {
            return "Dinner";
        }
    };
    DataService.prototype.getTextSN = function (value) {
        if (value == 1) {
            return "S";
        }
        else {
            return "N";
        }
    };
    DataService.prototype.handleError = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error);
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
