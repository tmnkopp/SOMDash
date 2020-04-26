import { Injectable } from '@angular/core';

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

export class IndexCompile implements ICompiler {
  public compile(content: string): string {
      let lines =  content.split('\n');
      let result: string; 
      for (var i = 0; i < lines.length; i++) {   
        result += `${lines[i].replace( /\$I/g, i.toString() )}\n` ; 
      } 
      return result; 
  }
}


