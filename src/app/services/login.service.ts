import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import {AppSettings} from '../model/AppSettings';

@Injectable()
export class LoginService {
    
  constructor(public http: Http) { }

  login(userName : string, password : string) : Observable<any> {
     let headers = new Headers({ 'Authorization': 'Basic ' +btoa(AppSettings.CLIENTE_ID +':'+AppSettings.SECRET_ID)});
     
     let options       = new RequestOptions({ headers: headers }); 
     let OauthLoginUrl = AppSettings.BASE_URL + '/oauth/token';
     let params : URLSearchParams = new URLSearchParams();
     params.set('username', userName);
     params.set('password', password);
     params.set('scope', 'openid');
     params.set('grant_type', 'password');
     
      return this.http.post(OauthLoginUrl, params, options)
        .map(this.handleData)
        .catch(this.handleError);      
  }

  private handleData(res: Response){
      let body = res.json();
      return body;
  }
  
  private handleError(error: any){
      console.log(error);
    
      return Observable.throw(error);
  }
  
  public logout(){
      localStorage.removeItem('token');
  }
  
}