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
        let lines =  content.split('\n');   
        let ExpressionLines = this._Expressions.split('\n');
        let _return :string = '';   

        

        for (var iLine = 0; iLine < lines.length; iLine++) 
        {       
            let parseType = "";
            let RegEx = ""; 
            this._ParseInclude = true;
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
        return _return; 
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
    constructor(formula: string){ 
        this._formula=formula;
    }
    public compile(content: string): string {
      let lines =  content.split('\n');   
      for (var i = 0; i < lines.length; i++) {   
           
        lines[i] = `${ this._formula.replace( /\$0/g,  lines[i] ) }` ; 
        
        let RegExMatch = lines[i].match(/\$I\+\d*/);
        if(RegExMatch!= null){
            let match=RegExMatch[RegExMatch.length-1];
            let increment = +match.split('+')[1]; 
            lines[i] = `${lines[i].replace (match, (i + increment).toString() )}`; 
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


