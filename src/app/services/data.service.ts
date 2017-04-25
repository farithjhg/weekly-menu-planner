import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import {ItemMenu} from '../model/ItemMenu'
import {Meal} from '../model/Meal'

@Injectable()
export class DataService {
  private _urlMenu  = "https://weekly-menu-planner.herokuapp.com/rest/weeklymenu";
  private _urlDaylyAdd  = "https://weekly-menu-planner.herokuapp.com/rest/weeklymenu/add";
  private _urlMealById   = "https://weekly-menu-planner.herokuapp.com/rest/recipes/findById/";
  private _urlMeals = "https://weekly-menu-planner.herokuapp.com/rest/recipes/getByType/";
  private _urlRecipeAdd  = "https://weekly-menu-planner.herokuapp.com/rest/recipes/add";
  private _urlRecipeUpdate = "https://weekly-menu-planner.herokuapp.com/rest/recipes/update";
  private _urlRecipeDelete = "https://weekly-menu-planner.herokuapp.com/rest/recipes/delete/";
  
  private _urlMealList = "https://weekly-menu-planner.herokuapp.com/rest/recipes/all";
  

  constructor(public http: Http) { }
  
  getMenu() :Observable<ItemMenu[]>{
    let authToken = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this._urlMenu,options)
       .map((res:Response) => res.json())
       .catch(this.handleError); 
  }  

  addRecipe (body: Object): Observable<any> {
    let authToken = localStorage.getItem('token');
    let bodyString = JSON.stringify(body); // Stringify payload
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });


    return this.http.post(this._urlRecipeAdd, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
 }   

  updateRecipe (body: Object): Observable<any> {
    let authToken = localStorage.getItem('token');
    let bodyString = JSON.stringify(body); // Stringify payload
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });


    return this.http.put(this._urlRecipeUpdate, bodyString, options) // ...using post request
                         .map((res:Response) => res.json())
                         .catch(this.handleError); 
 }   

  deleteRecipe (id: Number): Observable<any> {
    let authToken = localStorage.getItem('token');

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });


    return this.http.delete(this._urlRecipeDelete + id, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }   

  getMealsByType(type :number) :Observable<Meal[]>{
    let authToken = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });
    var URL = this._urlMeals + type;
    
    return this.http
      .get(URL,options)
       .map((res:Response) => res.json())
       .catch(this.handleError); 
  }  

  getMealsById(id :number) :Observable<Meal>{
    let authToken = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });
    var URL = this._urlMealById + id;
    
    return this.http
      .get(URL,options)
       .map((res:Response) => res.json())
       .catch(this.handleError); 
  } 

  addDaylyMeal (body: Object): Observable<any> {
    let authToken = localStorage.getItem('token');
    let bodyString = JSON.stringify(body); 
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });


    return this.http.post(this._urlDaylyAdd, bodyString, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }   

  getMealsList() :Observable<Meal[]>{
    let authToken = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });
    var URL = this._urlMealList;
    
    return this.http
      .get(URL,options)
       .map((res:Response) => {
         console.log("res "+res);         
         let myArray = res.json();
         for (let i = 0; i < myArray.length; i++){
           var meal:Meal = myArray[i];
           meal.nameType = this.getNameType(meal.typeRec);
           meal.weekendText = 
           meal.weekendText = this.getTextSN(meal.weekend);
         }

         
         return myArray;
       })
       .catch(this.handleError); 
  }  
  
  public getNameType(typeRec : Number): string{
    if(typeRec == 1){
        return "Breackfast";
    }else if(typeRec == 2){
        return "Lunch";
    }else{
        return "Dinner";
    }
  }

  public getTextSN(value : Number): string{
    if(value == 1){
        return "S";
    }else{
        return "N";
    }
  }
    
  private handleError(error: any){
      console.log(error);
    
      return Observable.throw(error);
  }

}