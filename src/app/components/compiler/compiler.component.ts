import { Component, OnInit, Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { Compilation, ICompilation } from '../../models/Compilation';
import { AppModel, AppModelItem } from '../../models/AppModel';
import { InfoSchemaService } from '../../services/info-schema.service';
import { CompilationService } from '../../services/compilation.service';
import { ReplaceBreaksToBrPipe } from '../../pipes/replace-breaks-to-br.pipe';
import { SnippetFormaterPipe } from '../../pipes/snippet-formater.pipe';
import { CompilersService, FormulaCompile, ReplacementsCompile, LineParseCompile, ICompiler } from '../../services/compilers.service'; 
import { stringify } from 'querystring';
@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss'],
  providers: [
    ReplaceBreaksToBrPipe
    , SnippetFormaterPipe
    ]
})

export class CompilerComponent implements OnInit {
    
    public compilation: Compilation = new Compilation(); 
    public cache: string;    
    public snippets: string[] = []; 

    public commands : string[] = [ 'get:tables', 'get:model', 'load:appmodelitems', 'load:compilation', 'put:save', 'post:saveas' ]; 
    public complist: ICompilation[]= [] ;
    public compSelected : string='';
    public TrimWhitespace : boolean; 
    constructor(
        private http: HttpClient , 
        private _InfoSchemaService: InfoSchemaService,    
        private _CompilationService: CompilationService , 
        private _CompilersService: CompilersService,
        private ReplaceBreaksToBr: ReplaceBreaksToBrPipe ,
        private SnippetFormaterPipe: SnippetFormaterPipe   
        ) 
    { 
        this.compilation.Command ='get:model';   
        this.compilation.CommandParams='EinsteinPublicIP';  
        this.compilation.AppModel = new AppModel();  
        this.compilation.AppModel.AppModelItems = [ 
            new AppModelItem( 1,'ID', 'int'  ) ,
            new AppModelItem( 2,'Field2', 'string'  )  
        ];
        
        this.compilation.ReplaceTerms='\\n:\\n';
        this.compilation.PostReplaceTerms='\\n:\\n';
        this.compilation.WrapExpression='$I+1000 $0 $1 $2 $M5 $I+1';
        this.compilation.ParseLines= ['-:~regex~','+:.*'].join('\n');
        this.compilation.CombineFrom=""; 

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
        if(this.compilation.CombineFrom==''){
            this.compilation.CombineFrom=content;
        }
        let compiler: ICompiler; 
 
        if(this.TrimWhitespace){
            content = this._CompilersService.TrimWhitespace(content); 
        }
        if(this.compilation.ParseLines){
            content = this.DoLineParse(content); 
        }      
        compiler = new ReplacementsCompile( this.compilation.ReplaceTerms );
        content = compiler.compile(content); 
        
        compiler = new FormulaCompile( 
            this.compilation.WrapExpression
            , this.compilation.CombineFrom
            , this.compilation.ControlType  );
        content = compiler.compile(content); 
        
        if (this.compilation.PostReplaceTerms != '') {
            compiler = new ReplacementsCompile( this.compilation.PostReplaceTerms );
            content = compiler.compile(content); 
        }

 
        this.compilation.CompileTo=content;

        this._CompilationService.GetSnippets('ModelSnippets').subscribe(data => {   
            this.snippets = data ;      
        });

    } 
    DoLineParse(content: string) : string {
        let compiler: ICompiler; 
        if(this.compilation.ParseLines){
            let parseLines =  this.compilation.ParseLines.split('\n') ;  
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
        this.compilation.CombineFrom ='';  
        this.compilation.ControlType=''; 
        this._InfoSchemaService.GetModel(this.compilation.CommandParams).subscribe(data => { 
            this.compilation.AppModel=data;
            for (var i = 0; i < this.compilation.AppModel.AppModelItems.length; i++) {  
                if(i>0){
                    this.compilation.CompileFrom += `\n` ;
                    this.compilation.CombineFrom += `\n` ;
                    this.compilation.ControlType += `\n` ;
                } 
                this.compilation.CompileFrom += `${this.compilation.AppModel.AppModelItems[i].Name}` ;
                this.compilation.CombineFrom += `${this.compilation.AppModel.AppModelItems[i].DataType}` ;
                this.compilation.ControlType += `${this.compilation.AppModel.AppModelItems[i].ControlType}` ;
            }    
        });  
    } 
    if(this.compilation.Command=='load:compilation'){ 
        let id = +this.compSelected; 
        this._CompilationService.Get(id).subscribe(data => {  
            this.compilation=data;    
            if(this.compilation.CommandParams != ''){
                this._InfoSchemaService.GetModel(this.compilation.CommandParams).subscribe(data => { 
                    this.compilation.AppModel=data;   
                });  
            }            
        });  
    }  
    if(this.compilation.Command=='load:appmodelitems'){ 
        let items : AppModelItem[] = []; 
        let arr = this.compilation.CompileFrom.split('\n'); 
        for (let index = 0; index < arr.length; index++) { 
            let ami = new AppModelItem();
            ami.Name = arr[index];
            ami.DataType='string'; 
            if(ami.Name.indexOf('date') >= 0){
                ami.DataType='date'      
            }
            if(index== 0 || ami.Name.indexOf('PK_') >= 0 || ami.Name.indexOf('FK_') >= 0){
                ami.DataType='int'      
            }            
            items.push(ami); 
        }
        this.compilation.AppModel.AppModelItems = items;
        console.log('AppModelItems loaded');      
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