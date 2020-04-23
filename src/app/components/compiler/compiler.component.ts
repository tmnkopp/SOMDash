import { Component, OnInit, Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { Compilation, ICompilation } from '../../models/Compilation';
import { AppModel, AppModelItem } from '../../models/AppModel';
import {InfoSchemaService } from '../../services/info-schema.service';
import { stringify } from 'querystring';
@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss']
})

export class CompilerComponent implements OnInit {
 
  public compilation: Compilation = new Compilation('', ''); 
  public cache: string; 
  public formula: string; 
  public replace: string;
  public resultItems:string[] = []; 
  public commands : string[] = ['get:tables','get:model', 'wrap', 'replace']; 
  constructor(private http: HttpClient
    , private _InfoSchemaService: InfoSchemaService) { 
    this.compilation.ModelName='aspnet_Membership'; 
    this.compilation.CompileFrom='';  
    this.compilation.CommandParams='';
  } 
  ngOnInit(): void {  
    $(".panel-left").resizable({
      handleSelector: ".splitter",
      resizeHeight: false
    });
  }
  OnKeyUp(form: NgForm){ 
    this.compilation.CompileTo='';
    let lines = this.compilation.CompileFrom.split('\n');
    let compileTo = ''; 
    for (var i = 0; i < lines.length; i++) {   
      compileTo += `${this.formula.replace('$0',lines[i])}\n`           
    } 
    this.compilation.CompileTo=compileTo;
  } 
  CompileFromUpdate(){
    this.compilation.CompileFrom=this.compilation.CompileFrom.toString().split(',').join( '\n') ;
  }
  onSubmit(form: NgForm){  
   
    if(this.compilation.Command=='get:tables'){
        this._InfoSchemaService.GetTables('asp').subscribe(data => {  
          this.compilation.CompileFrom=data;  
          this.CompileFromUpdate();
        }); 
    }  
    

    return true;
        this.http
        .post<ICompilation>('http://localhost:4000/api/Compilation/', this.compilation)
        .subscribe(data  => {   
            this.compilation=data;
            let appModelItems = this.compilation.AppModel.AppModelItems; 
            this.compilation.CompileFrom='';
            for (var i = 0; i < appModelItems.length; i++) {   
              this.compilation.CompileFrom += `${appModelItems[i].Name}\n`           
            }
            this.compilation.CompileTo  = this.compilation.CompileFrom;
        }, error => console.log(error)); 
  } 
}
declare var $: any;


