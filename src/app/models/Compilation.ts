import { AppModel } from './AppModel';

export class Compilation{
      constructor(
        public CompilationWorkspaceId?:number,
        public CompilationTitle?:string,
        public ModelName?:string,
        public AppModel?:AppModel,
        public Command?:string,
        public CommandParams?:string,
        public CompileFrom?:string,
        public CompileTo?:string,
        public WrapExpression?:string,
        public ReplaceTerms?:string,
        public ReplaceLines?:string
      ){} 
}//export class
export interface ICompilation {  
    CompilationWorkspaceId?:number;
    CompilationTitle?:string;
    ModelName?:string;
    AppModel?:AppModel;
    Command?:string;
    CommandParams?:string;
    CompileFrom?:string;
    CompileTo?:string;
    WrapExpression?:string;
    ReplaceTerms?:string;
    ReplaceLines?:string;
}//export class

 
    