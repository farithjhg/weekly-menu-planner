import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import {RouterModule, Routes} from "@angular/router";

import {DataTableModule,SharedModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';

import {FbService} from "./services/fb.service";
import { LoginService } from "./services/login.service";
import {DataService} from './services/data.service';

import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MealComponent } from './meal/meal.component';
import { DaylyMenuComponent } from './dayly-menu/dayly-menu.component';
import { MealsListComponent } from './meals-list/meals-list.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent},
  { path: 'newMeal', component: MealComponent},
  { path: 'newDayly', component: DaylyMenuComponent},
  { path: 'mealsList', component: MealsListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    MealComponent,
    DaylyMenuComponent,
    MealsListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    PanelModule,
    HttpModule
  ],
  providers: [FbService, LoginService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
