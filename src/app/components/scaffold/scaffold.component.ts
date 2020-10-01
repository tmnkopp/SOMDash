import { Component, OnInit, Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { CodeTemplate, ICodeTemplate  } from '../../models/CodeTemplate';
import { Scaffold, IScaffold  } from '../../models/Scaffold';
import { ScaffoldService } from '../../services/scaffold.service';
import { stringify } from 'querystring';
import { CompilersService, FormulaCompile, ReplacementsCompile, LineParseCompile, ICompiler } from '../../services/compilers.service';

@Component({
  selector: 'app-scaffold',
  templateUrl: './scaffold.component.html',
  styleUrls: ['./scaffold.component.scss']
})
export class ScaffoldComponent implements OnInit {
    public _Scaffold; 
    public commands : string[] = ['get:GetCodeTemplates', 'load:Scaffold', 'save:Scaffold' ]; 
    public command: string='';   
    constructor(
        private http: HttpClient , 
        private _ScaffoldService: ScaffoldService , 
        private _CompilersService: CompilersService 
        ) 
    {  
        this._Scaffold = new Scaffold();
        this._Scaffold.CodeTemplates = new Array();
        this.command='';
    }  

    ngOnInit(): void {  
        this._Scaffold.ModelName='{0}';
        
        this._ScaffoldService.GetScaffold(0).subscribe(data=>{   
            this._Scaffold=data;
        });  
    }
    onSubmit(form: NgForm){   
        this._Scaffold.CodeTemplates= new Array(); 
        //this._Scaffold.ModelName='ModelName';
        //this._Scaffold.Namespace='Namespace'; 
        //this._Scaffold.SaveDestination=''; 
        let SaveDest = this._Scaffold.SaveDestination;
        if (this.command=='get:GetCodeTemplates') { 
            this._ScaffoldService.GetCodeTemplates(this._Scaffold.ModelName, this._Scaffold.Namespace).subscribe(data => {  
                this._Scaffold=data;    
            });
            if(SaveDest!= ''){
                this._Scaffold.SaveDestination=SaveDest;
            }  
        }
        if (this.command=='load:Scaffold') {
            this._ScaffoldService.Load(this._Scaffold).subscribe(data => {  
                this._Scaffold=data;    
            });  
        }
        if (this.command=='save:Scaffold') {
            console.log(this._Scaffold.CodeTemplates);
            this._ScaffoldService.Save(this._Scaffold).subscribe(data => {  
                this._Scaffold=data;    
            });  
        }
  
    }
}



 