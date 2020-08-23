import { AppModel } from './AppModel';

export class CodeTemplate{
      constructor( 
        public Name?:string,
        public Content?:string,
        public Type?:string 
      ){} 
}//export class
export interface ICodeTemplate {   
    Name?:string;
    Content?:string;
    Type?:string;
}//export class

 
    