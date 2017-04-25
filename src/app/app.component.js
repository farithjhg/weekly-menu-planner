"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(afService, router) {
        var _this = this;
        this.afService = afService;
        this.router = router;
        // This asynchronously checks if our user is logged it and will automatically
        // redirect them to the Login page when the status changes.
        // This is just a small thing that Firebase does that makes it easy to use.
        this.afService.af.auth.subscribe(function (auth) {
            if (auth == null) {
                console.log("Not Logged in.");
                _this.isLoggedIn = false;
                _this.router.navigate(['login']);
            }
            else {
                console.log("Successfully Logged in.");
                // Set the Display Name and Email so we can attribute messages to them
                if (auth.google) {
                    _this.afService.displayName = auth.google.displayName;
                    _this.afService.email = auth.google.email;
                }
                else {
                    _this.afService.displayName = auth.auth.email;
                    _this.afService.email = auth.auth.email;
                }
                _this.isLoggedIn = true;
                _this.router.navigate(['home']);
            }
        });
    }
    AppComponent.prototype.logout = function () {
        this.afService.logout();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
