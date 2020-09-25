import { Injectable } from '@angular/core'; 
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { CodeTemplate, ICodeTemplate } from '../models/CodeTemplate'; 
import { ConstantsService } from '../services/constants.service';
import { Scaffold, IScaffold  } from '../models/Scaffold';

@Injectable({
  providedIn: 'root'
})
export class ScaffoldService { 
    public baseApiUrl : string;
    constructor(
      private _http: HttpClient, 
      private _ConstantsService:ConstantsService) {  
        this.baseApiUrl = _ConstantsService.baseApiUrl;
      } 
      public GetScaffold(id:number): any {   
        return  this._http.get<IScaffold>( `${this.baseApiUrl}Scaffold/GetScaffold/${id}` )  ; 
      }        
      public GetCodeTemplates(model: string, namespace: string): any {   
        return  this._http.get<ICodeTemplate[]>( `${this.baseApiUrl}Scaffold/GetCodeTemplates/${model}/${namespace}` )  ; 
      }  
      public Load (scaffold: Scaffold): any {    
        return  this._http.post( `${this.baseApiUrl}Scaffold/Load`, scaffold )  ; 
      }    
      public Save (scaffold: Scaffold): any {    
        return  this._http.post( `${this.baseApiUrl}Scaffold/Save`, scaffold )  ; 
      }    
  
         
}
