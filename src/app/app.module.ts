import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import { AppModelComponent } from './components/app-model/app-model.component';
import { FindComponent } from './components/find/find.component';
import { ConstantsService } from './services/constants.service';
import {CompilationService} from './services/compilation.service';
import { SqlComponent } from './components/sql/sql.component';
import { ReplaceLineBreaks } from './pipes/replace-line-breaks.pipe';
import { ScaffoldComponent } from './components/scaffold/scaffold.component';
import { ScaffoldService } from './services/scaffold.service';
@NgModule({
  declarations: [
    AppComponent,
    CompilerComponent,
    AppModelComponent,
    FindComponent,
    SqlComponent,
    ReplaceLineBreaks,
    ScaffoldComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule ,
    FormsModule
  ],
  providers: [ConstantsService, CompilationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
