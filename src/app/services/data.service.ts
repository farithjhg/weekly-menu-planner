import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Rx'
import {ItemMenu} from '../model/ItemMenu'
import {Meal} from '../model/Meal'
import {AppSettings} from '../model/AppSettings';

@Injectable()
export class DataService {

  private _BASE_URL = AppSettings.BASE_URL;
  //Dayly Menu URLs
  private _urlMenu  = this._BASE_URL+"/rest/weeklymenu/actual";
  private _urlDaylyAdd  = this._BASE_URL+"/rest/weeklymenu/add";
  private _urlDaylyUpdate  = this._BASE_URL+"/rest/weeklymenu/update";
  //Meals URLs
  private _urlMealById   = this._BASE_URL+"/rest/recipes/findById/";
  private _urlMeals = this._BASE_URL+"/rest/recipes/getByType/";
  private _urlRecipeAdd  = this._BASE_URL+"/rest/recipes/add";
  private _urlRecipeUpdate = this._BASE_URL+"/rest/recipes/update";
  private _urlRecipeDelete = this._BASE_URL+"/rest/recipes/delete/";
  private _urlMealList = this._BASE_URL+"/rest/recipes/all";
  //Notes URLs
  private _urlNoteAdd = this._BASE_URL+"/rest/notes/add";  
  private _urlNoteUpdate = this._BASE_URL+"/rest/notes/update";  
  private _urlNoteByDaylyMenu = this._BASE_URL+"/rest/notes/findByRwId/";  

  constructor(public http: Http) { }
  
  /**
   * Get the actual weekly menu
   */
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

  /**
   * Add a Note to the DB 
   * @param body 
   */
  addNote (body: Object): Observable<any> {
    let authToken = localStorage.getItem('token');
    let bodyString = JSON.stringify(body); 
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });


    return this.http.post(this._urlNoteAdd , bodyString, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
 }   

/**
 * Update a Recipe 
 * @param body 
 */
  updateNote (body: Object): Observable<any> {
    let authToken = localStorage.getItem('token');
    let bodyString = JSON.stringify(body); 
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });


    return this.http.put(this._urlNoteUpdate, bodyString, options) 
                         .map((res:Response) => res.json())
                         .catch(this.handleError); 
  }

  /**
   * Add a Recipe to the DB 
   * @param body 
   */
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


/**
 * Update a Recipe 
 * @param body 
 */
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

 /**
  * Delete a Recipe from DB
  */
  deleteRecipe (id: Number): Observable<any> {
    let authToken = localStorage.getItem('token');

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });


    return this.http.delete(this._urlRecipeDelete + id, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }   

 /**
  * Get a List of Meals by Type
  * @param type 
  */
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

  /**
   * Get a Meal by Id
   * @param id 
   */
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

  /**
   * Add a new Dayly Menu in DB
   * @param body
   */
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

  updateDaylyMeal (body: Object): Observable<any> {
    let authToken = localStorage.getItem('token');
    let bodyString = JSON.stringify(body); // Stringify payload
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers });

    return this.http.put(this._urlDaylyUpdate , bodyString, options) 
                         .map((res:Response) => res.json())
                         .catch(this.handleError); 
 }   

  /**
   * Get a List of Meal
   */
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