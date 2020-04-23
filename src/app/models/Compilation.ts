import { AppModel } from './AppModel';

export class Compilation{
      constructor(
            public ModelName?:string,
            public Command?:string,
            public CommandParams?:string,
            public CompileFrom?:string, 
            public CompileTo?:string,
            public AppModel?:AppModel
      ){} 
}//export class
export interface ICompilation {  
      ModelName?:string;
      Command?:string;
      CommandParams?:string; 
      CompileFrom?: string;
      CompileTo?: string;
      AppModel?:AppModel;
}//export class
    