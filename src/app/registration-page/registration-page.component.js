"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RegistrationPageComponent = (function () {
    function RegistrationPageComponent(afService, router) {
        this.afService = afService;
        this.router = router;
    }
    //registers the user and logs them in
    RegistrationPageComponent.prototype.register = function (event, name, email, password) {
        var _this = this;
        event.preventDefault();
        this.afService.registerUser(email, password).then(function (user) {
            _this.afService.saveUserInfoFromForm(user.uid, name, email).then(function () {
                _this.router.navigate(['']);
            })
                .catch(function (error) {
                _this.error = error;
            });
        })
            .catch(function (error) {
            _this.error = error;
            console.log(_this.error);
        });
    };
    RegistrationPageComponent.prototype.ngOnInit = function () {
    };
    RegistrationPageComponent = __decorate([
        core_1.Component({
            selector: 'app-registration-page',
            templateUrl: './registration-page.component.html',
            styleUrls: ['./registration-page.component.css']
        })
    ], RegistrationPageComponent);
    return RegistrationPageComponent;
}());
exports.RegistrationPageComponent = RegistrationPageComponent;
