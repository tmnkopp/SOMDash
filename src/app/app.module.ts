import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import { AppModelComponent } from './components/app-model/app-model.component';
import { FindComponent } from './components/find/find.component';

@NgModule({
  declarations: [
    AppComponent,
    CompilerComponent,
    AppModelComponent,
    FindComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
