"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var FbService = (function () {
    function FbService(af) {
        var _this = this;
        this.af = af;
        this.af.auth.subscribe(function (auth) {
            if (auth != null) {
                _this.user = _this.af.database.object('users/' + auth.uid);
            }
        });
        this.messages = this.af.database.list('messages');
        this.users = this.af.database.list('users');
    }
    /**
     * Logs in the user
     * @returns {firebase.Promise<FirebaseAuthState>}
     */
    FbService.prototype.loginWithGoogle = function () {
        return this.af.auth.login({
            provider: angularfire2_1.AuthProviders.Google,
            method: angularfire2_1.AuthMethods.Popup
        });
    };
    /**
     * Logs out the current user
     */
    FbService.prototype.logout = function () {
        return this.af.auth.logout();
    };
    /**
     *
     */
    FbService.prototype.addUserInfo = function () {
        //We saved their auth info now save the rest to the db.
        this.users.push({
            email: this.email,
            displayName: this.displayName
        });
    };
    /**
     * Saves a message to the Firebase Realtime Database
     * @param text
     */
    FbService.prototype.sendMessage = function (text) {
        var message = {
            message: text,
            displayName: this.displayName,
            email: this.email,
            timestamp: Date.now()
        };
        this.messages.push(message);
    };
    /**
     *
     * @param model
     * @returns {firebase.Promise<void>}
     */
    FbService.prototype.registerUser = function (email, password) {
        console.log(email);
        return this.af.auth.createUser({
            email: email,
            password: password
        });
    };
    /**
     *
     * @param uid
     * @param model
     * @returns {firebase.Promise<void>}
     */
    FbService.prototype.saveUserInfoFromForm = function (uid, name, email) {
        return this.af.database.object('registeredUsers/' + uid).set({
            name: name,
            email: email
        });
    };
    /**
     * Logs the user in using their Email/Password combo
     * @param email
     * @param password
     * @returns {firebase.Promise<FirebaseAuthState>}
     */
    FbService.prototype.loginWithEmail = function (email, password) {
        return this.af.auth.login({
            email: email,
            password: password
        }, {
            provider: angularfire2_1.AuthProviders.Password,
            method: angularfire2_1.AuthMethods.Password
        });
    };
    FbService = __decorate([
        core_1.Injectable()
    ], FbService);
    return FbService;
}());
exports.FbService = FbService;
