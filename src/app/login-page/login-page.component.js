"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoginPageComponent = (function () {
    function LoginPageComponent(afService, router) {
        this.afService = afService;
        this.router = router;
    }
    LoginPageComponent.prototype.loginWithGoogle = function () {
        var _this = this;
        this.afService.loginWithGoogle().then(function (data) {
            // Send them to the homepage if they are logged in
            _this.afService.addUserInfo();
            _this.router.navigate(['home']);
        });
    };
    LoginPageComponent.prototype.loginWithEmail = function (event, email, password) {
        var _this = this;
        event.preventDefault();
        this.afService.loginWithEmail(email, password).then(function () {
            _this.router.navigate(['home']);
        })
            .catch(function (error) {
            if (error) {
                _this.error = error;
                console.log(_this.error);
            }
        });
    };
    LoginPageComponent.prototype.ngOnInit = function () {
    };
    LoginPageComponent = __decorate([
        core_1.Component({
            selector: 'app-login-page',
            templateUrl: './login-page.component.html',
            styleUrls: ['./login-page.component.css']
        })
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
