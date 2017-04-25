"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HomePageComponent = (function () {
    function HomePageComponent(router, loginService) {
        this.router = router;
        this.loginService = loginService;
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginService.login().subscribe(function (response) {
            localStorage.setItem('token', response.access_token);
            _this.getMenu();
        }, function (error) {
            alert(error);
        });
    };
    HomePageComponent.prototype.getMenu = function () {
        var _this = this;
        this.loginService.getMenu().subscribe(function (response) {
            _this.itemMenu = response;
        }, function (error) {
            alert(error);
        });
    };
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'app-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.css']
        })
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
