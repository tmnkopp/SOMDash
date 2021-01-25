export class AppModel{
      constructor(
            public AppModelId?:number, 
            public ModelName?:string,
            public AppModelItems?:AppModelItem[]
      ){}
}//export class
export class AppModelItem{
      constructor(
            public AppModelItemId?:number, 
            public Name?:string,
            public DataType?:string,
            public ControlType?:string
      ){} 
}//export class 