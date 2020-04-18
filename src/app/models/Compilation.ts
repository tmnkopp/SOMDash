import { AppModel } from './AppModel';

export class Compilation{
      constructor(
            public ModelName?:string,
            public CompileFrom?:string, 
            public CompileTo?:string,
            public AppModel?:AppModel
      ){} 
}//export class
export interface ICompilation {  
      ModelName?:string;
      CompileFrom?: string;
      CompileTo?: string;
      AppModel?:AppModel;
}//export class
    