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
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.OauthLoginUrl = 'https://weekly-menu-planner.herokuapp.com/oauth/token';
        this.clientId = '0912747597133';
        this.secretId = '33b17e044ee6a4fa383f46ec6e28ea1d';
        this.userName = 'admin';
        this.password = 'master';
        this._urlGetMenu = "https://weekly-menu-planner.herokuapp.com/rest/weeklymenu/actual";
    }
    LoginService.prototype.createAuthorizationHeader = function (headers) {
        headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.secretId));
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
    };
    LoginService.prototype.login = function () {
        var headers = new http_1.Headers({ 'Content-Disposition': 'form-data',
            'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.secretId) });
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        var params = new http_1.URLSearchParams();
        params.set('username', this.userName);
        params.set('password', this.password);
        params.set('scope', 'read');
        params.set('grant_type', 'password');
        return this.http.post(this.OauthLoginUrl, params, options)
            .map(this.handleData)
            .catch(this.handleError);
    };
    LoginService.prototype.getMenu = function () {
        var authToken = localStorage.getItem('token');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .get(this._urlGetMenu, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LoginService.prototype.handleData = function (res) {
        var body = res.json();
        return body;
    };
    LoginService.prototype.handleError = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error);
    };
    LoginService.prototype.logout = function () {
        localStorage.removeItem('token');
    };
    LoginService.prototype.getValue = function (key) {
        var _this = this;
        return this.http.get('config.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.data = data;
            console.log(key);
        }, function (err) { return console.log(err); }, function () { return console.log('done'); });
    };
    LoginService = __decorate([
        core_1.Injectable()
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
