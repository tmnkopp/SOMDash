import { Component, OnInit, Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { Compilation, ICompilation } from '../../models/Compilation';
import { AppModel, AppModelItem } from '../../models/AppModel';
import { InfoSchemaService } from '../../services/info-schema.service';
import { CompilationService } from '../../services/compilation.service';

import { stringify } from 'querystring';
@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss']
})

export class CompilerComponent implements OnInit {
 
    public compilation: Compilation = new Compilation(); 
    public cache: string; 
    public formula: string; 
    public replacements: string;
    public resultItems:string[] = []; 
    public commands : string[] = [ 'get:tables', 'get:model', 'load:compilation', 'put:save', 'post:saveas' ]; 
    public complist: ICompilation[]= [] ;
     public compSelected : string='';
    constructor(
        private http: HttpClient , 
        private _InfoSchemaService: InfoSchemaService,    
        private _CompilationService: CompilationService   ) 
    { 
        this.compilation.Command ='get:model'; 
        this.formula='$0'; 
        this.compilation.CommandParams='SOMAPI.Models.CompilerViewModel'; 
        this.compilation.CompileFrom=''; 
        this.compilation.AppModel = new AppModel(); 
        this.compilation.AppModel.AppModelItems = [];
        this.replacements='\\n:\\n';

    } 

    ngOnInit(): void {  
        $(".panel-left").resizable({
            handleSelector: ".splitter",  resizeHeight: false
        });  
        this._CompilationService.GetAll().subscribe(data=>{  
          
            this.complist=data
        }); 
    }

    DoWrap(form: NgForm){ 
        this.compilation.CompileTo='';
        let lines = this.compilation.CompileFrom.split('\n');
        let compileTo = ''; 

        for (var i = 0; i < lines.length; i++) {   
            compileTo += `${this.formula.replace(/\$0/g,lines[i])}\n` 

            let RegExMatch = compileTo.match(/\$I\+\d*/);
            if(RegExMatch!= null){
                let match=RegExMatch[RegExMatch.length-1];
                let increment = +match.split('+')[1]; 
                compileTo = `${compileTo.replace (match, (i + increment).toString() )}`; 
            }        

            RegExMatch = compileTo.match(/\$M\d*/);
            if(RegExMatch!= null){
                let match=RegExMatch[RegExMatch.length-1];
                let mod = +match.replace('$M', ''); 
                if(((i+1) % mod)==0){
                    compileTo = `${compileTo.replace(match, 'MOD'+ (i % mod).toString() )}`; 
                }else{
                    compileTo = `${compileTo.replace(match, '' )}`;    
                }
            } 

        } 
        this.compilation.CompileTo=compileTo;
    } 

    DoReplace(form: NgForm){    
        this.DoWrap(form);
        let lines = this.replacements.split('\n');
        let compileTo = this.compilation.CompileTo;
        for (var i = 0; i < lines.length; i++) {  
            if(lines[i].split(':').length >= 2){
                let replaceItem = lines[i].split(':')[0].replace(/\\n/g,'\n');
                let replaceWith = lines[i].split(':')[1]
                    .replace(/\\n/g,'\n')
                    .replace('\\b','')
                    .replace('\\t','\t'); 
                compileTo = compileTo.split(replaceItem).join(replaceWith);
            }  
        } 
        this.compilation.CompileTo=compileTo; 
    }  
  
  onSubmit(form: NgForm){   
    if(this.compilation.Command=='get:tables'){
        this.compilation.CompileFrom='';
        this._InfoSchemaService.GetTables(this.compilation.CommandParams).subscribe(data => {  
            this.compilation.CompileFrom=data.toString().split(',').join( '\n');   
        }); 
        this.compilation.ModelName=this.compilation.CommandParams;
    }  
    if(this.compilation.Command=='get:model'){
        this.compilation.CompileFrom='';
        this._InfoSchemaService.GetModel(this.compilation.CommandParams).subscribe(data => { 
            this.compilation.AppModel=data;
            for (var i = 0; i < this.compilation.AppModel.AppModelItems.length; i++) {   
                this.compilation.CompileFrom += `${this.compilation.AppModel.AppModelItems[i].Name}\n` 
            }    
        });  
    } 
    if(this.compilation.Command=='load:compilation'){ 
        let id = +this.compSelected;
        console.log(id);
        this._CompilationService.Get(id).subscribe(data => {  
            this.compilation=data;   
        }); 
    } 

    if(this.compilation.Command=='post:saveas'){
        this._CompilationService.SaveAs(this.compilation).subscribe(data => {  
            this.compilation=data;   
        });  
    }  
    if(this.compilation.Command=='put:save'){
        this._CompilationService.Save(this.compilation).subscribe(data => {  
            this.compilation=data;   
        });  
    }  
  
  } 
}
declare var $: any;
 
