import { Injectable } from '@angular/core'; 
import { HttpHeaders, HttpClient } from '@angular/common/http';   
import { ConstantsService } from './constants.service';
import { Snippet, ISnippet } from '../models/Snippet';
 
@Injectable({
  providedIn: 'root'
})
export class SnippetService {  
    public baseApiUrl : string;
    constructor(
      private _http: HttpClient, 
      private _ConstantsService:ConstantsService) {  
        this.baseApiUrl = _ConstantsService.baseApiUrl;
      }  
      public Get(RepoItemName:string): any {   
        return  this._http.get<ISnippet>( `${this.baseApiUrl}Repo/${RepoItemName}` )  ; 
      }   
}
