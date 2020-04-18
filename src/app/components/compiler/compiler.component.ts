import { Component, OnInit, Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { Compilation, ICompilation } from '../../models/Compilation';
import { AppModel, AppModelItem } from '../../models/AppModel';

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
  
  constructor(private http: HttpClient) { 
    this.compilation.ModelName='aspnet_Membership'; 
    this.compilation.CompileFrom='';  
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
  onSubmit(form: NgForm){    
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


