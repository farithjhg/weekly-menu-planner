"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var angularfire2_1 = require('angularfire2');
var router_1 = require("@angular/router");
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var fb_service_1 = require("./services/fb.service");
var login_service_1 = require("./services/login.service");
var data_service_1 = require('./services/data.service');
var app_component_1 = require('./app.component');
var registration_page_component_1 = require('./registration-page/registration-page.component');
var login_page_component_1 = require('./login-page/login-page.component');
var home_page_component_1 = require('./home-page/home-page.component');
var meal_component_1 = require('./meal/meal.component');
var dayly_menu_component_1 = require('./dayly-menu/dayly-menu.component');
var meals_list_component_1 = require('./meals-list/meals-list.component');
// Must export the config
exports.firebaseConfig = {
    apiKey: "AIzaSyD2cXXQu3WSmNTPhJh1HYR20kjGc0WLumQ",
    authDomain: "myweeklymenuplanner.firebaseapp.com",
    databaseURL: "https://myweeklymenuplanner.firebaseio.com",
    storageBucket: "myweeklymenuplanner.appspot.com",
    messagingSenderId: "769907540512"
};
var routes = [
    { path: '', component: app_component_1.AppComponent },
    { path: 'home', component: home_page_component_1.HomePageComponent },
    { path: 'login', component: login_page_component_1.LoginPageComponent },
    { path: 'register', component: registration_page_component_1.RegistrationPageComponent },
    { path: 'newMeal', component: meal_component_1.MealComponent },
    { path: 'newDayly', component: dayly_menu_component_1.DaylyMenuComponent },
    { path: 'mealsList', component: meals_list_component_1.MealsListComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                registration_page_component_1.RegistrationPageComponent,
                login_page_component_1.LoginPageComponent,
                home_page_component_1.HomePageComponent,
                meal_component_1.MealComponent,
                dayly_menu_component_1.DaylyMenuComponent,
                meals_list_component_1.MealsListComponent
            ],
            imports: [
                angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig),
                router_1.RouterModule.forRoot(routes),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                primeng_1.DataTableModule,
                primeng_1.SharedModule,
                primeng_2.DialogModule,
                http_1.HttpModule
            ],
            providers: [fb_service_1.FbService, login_service_1.LoginService, data_service_1.DataService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
