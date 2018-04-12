import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { AdminComponent } from './admin/admin.component';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },

  { path: '**', component: DisplayComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
