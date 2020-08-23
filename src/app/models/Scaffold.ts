import { CodeTemplate } from './CodeTemplate';

export class Scaffold{
      constructor( 
        public ScaffoldId?:number,
        public ModelName?:string,
        public Namespace?:string,
        public SaveDestination?:string,
        public CodeTemplates?:CodeTemplate[] 
      ){} 
}//export class
export interface IScaffold {   
    ScaffoldId?:number;
    ModelName?:string;
    Namespace?:string;
    SaveDestination?:string;
    CodeTemplates?:CodeTemplate[];
}//export class

 
    