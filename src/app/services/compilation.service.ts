import { Injectable } from '@angular/core'; 
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { Compilation, ICompilation } from '../models/Compilation';
import { AppModel, AppModelItem } from '../models/AppModel';
import { ConstantsService } from '../services/constants.service';


@Injectable({
  providedIn: 'root'
})
export class CompilationService {  
    public baseApiUrl : string;
    constructor(
      private _http: HttpClient, 
      private _ConstantsService:ConstantsService) {  
        this.baseApiUrl = _ConstantsService.baseApiUrl;
      } 
      public GetAll(): any {   
        return  this._http.get<ICompilation[]>( `${this.baseApiUrl}Compilation/GetAll/` )  ; 
      } 
      public Get(id:number): any {   
        return  this._http.get<ICompilation>( `${this.baseApiUrl}Compilation/Get/${id}` )  ; 
      } 
      public SaveAs (compilation: Compilation): any {   
        return  this._http.post( `${this.baseApiUrl}Compilation/`, compilation )  ; 
      }  
      public Save (compilation: Compilation): any {    
        return  this._http.put( `${this.baseApiUrl}Compilation/`, compilation )  ; 
      }  
}
