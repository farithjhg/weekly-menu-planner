import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import {ItemMenu} from '../model/ItemMenu'

@Injectable()
export class LoginService {
	private _BASE_URL = "https://mymenu.services.piviyorkdev.com";
	private OauthLoginUrl = this._BASE_URL+"/oauth/token";
  private clientId = '0912747597133';
  private secretId = '33b17e044ee6a4fa383f46ec6e28ea1d';
  private userName = 'admin';
  private password = 'master';
  private _urlGetMenu = this._BASE_URL+"/rest/weeklymenu/actual"
  data:Array<Object>; 
    
  constructor(public http: Http) { }

  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'Basic ' +btoa(this.clientId+':'+this.secretId)); 
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
  }
  
  login() : Observable<any> {
     let headers = new Headers({ 'Content-Disposition': 'form-data',
                                 'Authorization': 'Basic ' +btoa(this.clientId+':'+this.secretId)});

     let options       = new RequestOptions({ headers: headers }); // Create a request option

     let params : URLSearchParams = new URLSearchParams();
     params.set('username', this.userName);
     params.set('password', this.password);
     params.set('scope', 'read');
     params.set('grant_type', 'password');
     
      return this.http.post(this.OauthLoginUrl, params, options)
        .map(this.handleData)
        .catch( (error:any) => {
          console.log(error);
          return Observable.throw(error.json().error || 'Server error')
        });      
  }
  
  getMenu() :Observable<ItemMenu[]>{
    let authToken = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this._urlGetMenu,options)
       .map((res:Response) => res.json())
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
  
  private getValue(key : String){
     return this.http.get('config.json')
          .map(res => res.json())
          .subscribe((data) => {  
            this.data=data; 
            console.log(key);
          },
           err=>console.log(err), ()=>console.log('done')
          );
  }
}