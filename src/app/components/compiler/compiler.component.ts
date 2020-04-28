import { Component, OnInit, Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { Compilation, ICompilation } from '../../models/Compilation';
import { AppModel, AppModelItem } from '../../models/AppModel';
import { InfoSchemaService } from '../../services/info-schema.service';
import { CompilationService } from '../../services/compilation.service';
import { CompilersService, FormulaCompile, ReplacementsCompile, LineParseCompile, ICompiler } from '../../services/compilers.service';

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
    public lineParse:string;
    public replacements: string;
    public resultItems:string[] = []; 
    public commands : string[] = [ 'get:tables', 'get:model', 'load:compilation', 'put:save', 'post:saveas' ]; 
    public complist: ICompilation[]= [] ;
     public compSelected : string='';
    constructor(
        private http: HttpClient , 
        private _InfoSchemaService: InfoSchemaService,    
        private _CompilationService: CompilationService , 
        private _CompilersService: CompilersService  ) 
    { 
        this.compilation.Command ='get:model'; 
        this.formula='$0';  
        this.compilation.CommandParams='SOMAPI.Models.CompilerViewModel';  
        this.compilation.AppModel = new AppModel();  
        this.compilation.AppModel.AppModelItems = [ 
            new AppModelItem( 1,'ID', 'int'  ) ,
            new AppModelItem( 2,'Field2', 'string'  ) ,
            new AppModelItem( 3,'Field3', 'string'  ) 
        ];
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


    ReCompile(form: NgForm){ 
        let content = this.compilation.CompileFrom; 
        let compiler: ICompiler; 
        compiler = new FormulaCompile( this.formula );
            content = compiler.compile(content); 
        compiler = new ReplacementsCompile( this.replacements );
            content = compiler.compile(content); 
        
        content = this.DoLineParse(content); 

        this.compilation.CompileTo=content;
    }

    DoLineParse(content: string) : string {
        let compiler: ICompiler; 
        if(this.lineParse){
            let parseLines =  this.lineParse.split('\n') ;  
            for (let index = 0; index < parseLines.length; index++) {
                let element = parseLines[index];
                let parseType = '+';
                let RegEx = element;  
                if(element.split(':').length >= 2)
                { 
                    parseType = element.split(':')[0];
                    RegEx = element.split(':')[1] ;      
                }
                compiler = new LineParseCompile(RegEx, (parseType=='+'));
                content = compiler.compile(content); 
            }
        } 
        return content; 
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