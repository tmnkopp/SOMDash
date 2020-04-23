import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import { Compilation, ICompilation } from '../models/Compilation';
import { AppModel, AppModelItem } from '../models/AppModel';
import { ConstantsService } from '../services/constants.service';
@Injectable({
  providedIn: 'root'
})
export class InfoSchemaService { 
  public result : string[]; 
  public filter : string;
  public baseApiUrl : string;
  constructor(
    private _http: HttpClient, 
    private _ConstantsService:ConstantsService) {  
      this.baseApiUrl = _ConstantsService.baseApiUrl;
    } 
    public GetTables (filter: string): any {   
      return  this._http.get<string[]>( `${this.baseApiUrl}Compilation/Tables/${filter}` )  ; 
  } 
}
