import { AppModel } from './AppModel';

export class CodeTemplate{
      constructor( 
        public TemplateID?:number,
        public Name?:string,
        public Content?:string,
        public Type?:string 
      ){} 
}//export class
export interface ICodeTemplate {   
    TemplateID?:number;
    Name?:string;
    Content?:string;
    Type?:string;
}//export class

 
    