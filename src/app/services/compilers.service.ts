import { findLast } from '@angular/compiler/src/directive_resolver';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CompilersService {

  constructor() { }

  getStr(str: string) : string {
    return str; 
  }
  TrimWhitespace(content: string) : string {
      let _result:string = ''; 
    content.split('\n').forEach(function (element, i)  {
        if(i>0){ _result += '\n'}
        _result += `${element.trimLeft().trimRight()}`; 
    });
    return _result; 
  }

}
export interface ICompiler {
  compile( content: string): string;
} 
export class LineParseCompile implements ICompiler {
    private _Expressions:string = "";
    private _ParseInclude:boolean; 
    constructor(Expressions: string , ParseInclude: boolean ){ 
        this._Expressions=Expressions; 
        this._ParseInclude=ParseInclude;
    }
    public compile(content: string): string {
        if(!this._Expressions){
            return content; 
        }
        if(content==''){
            return content; 
        }
        let lines =  content.split('\n');   
        let ExpressionLines = this._Expressions.split('\n');
        let _return :string = '';   

        for (var iLine = 0; iLine < lines.length; iLine++) 
        {       
            
            let parseType = "";
            let RegEx = "";  
            let found:boolean = false;
            for (let index = 0; index < ExpressionLines.length; index++) {  

                RegEx=ExpressionLines[index];   
                let RegExMatch = lines[iLine].match(new RegExp( RegEx ,"g")); 
  
                if(RegExMatch!= null){
                    found=true;
                }   
            }     
            if(found && this._ParseInclude){
                _return += lines[iLine]+'\n';    
            }
            if(!found && !this._ParseInclude){
                _return += lines[iLine]+'\n';    
            }
        } 
        return _return.substr(0,_return.length-1); 
    }
}
export class ReplacementsCompile implements ICompiler {
    private _replacements:string = "";
    constructor(Replacements: string){ 
        this._replacements=Replacements;
    }
    public compile(content: string): string {
        let replacementLines =  this._replacements.split('\n');   
        for (var i = 0; i < replacementLines.length; i++) 
        {   
            if(replacementLines[i].split(':').length >= 2)
            {
                let replaceItem = replacementLines[i].split(':')[0].replace(/\\n/g,'\n');
                let replaceWith = replacementLines[i].split(':')[1]
                    .replace(/\\n/g,'\n')
                    .replace('\\b','')
                    .replace('\\t','\t'); 
                    content = content.split(replaceItem).join(replaceWith);
            }    
        }   
        return content; 
    }
}
export class FormulaCompile implements ICompiler {
    private _formula:string = "";
    private _CombineFrom:string = "";
    private _ControlType:string = "";
    constructor(formula: string, CombineFrom: string, ControlType: string){ 
        this._formula=formula;
        this._CombineFrom=CombineFrom;  
        this._ControlType=ControlType;  
    } 
    public compile(content: string): string {
      let lines =  content.split('\n'); 
      if (!this._CombineFrom ){
        this._CombineFrom=content;
      }  
      if (!this._ControlType ){
        this._ControlType=content;
      }        
      let CombineFromLines = this._CombineFrom.split('\n'); 
      let ControlTypeLines = this._ControlType.split('\n'); 
      
      let cMax  = CombineFromLines.length ; 
      let cMax1  = ControlTypeLines.length ; 
      for (var i = 0; i < lines.length; i++) {   
           
        lines[i] = `${ this._formula.replace( /\$0/g,  lines[i] ) }` ;  
        lines[i] = `${ lines[i].replace( /\$1/g, CombineFromLines[i % cMax] ) }` ; 
        lines[i] = `${ lines[i].replace( /\$2/g, ControlTypeLines[i % cMax] ) }` ;

        let RegExMatch = lines[i].match(/\$I\+\d*/g); 
        if(RegExMatch!= null){
            for(let m=0; m<RegExMatch.length; m++){
                let match=RegExMatch[m];
                let increment = +match.split('+')[1]; 
                lines[i] = `${lines[i].replace (match, (i + increment).toString() )}`; 
            } 
        }  

 
        RegExMatch = lines[i].match(/\$M\d*/);
        if(RegExMatch!= null){
            let match=RegExMatch[RegExMatch.length-1];
            let mod = +match.replace('$M', ''); 
            if(((i+1) % mod)==0){
                lines[i] = `${lines[i].replace(match, '$M'+ (i % mod).toString() )}`; 
            }else{
                lines[i] = `${lines[i].replace(match, '' )}`;    
            }
        }  
      }   
      return lines.join('\n' ); 
  }
}


