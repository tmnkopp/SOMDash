export class AppModel{
      constructor(
            public AppModelId?:number, 
            public Name?:string,
            public AppModelItems?:AppModelItem[]
      ){}
}//export class
export class AppModelItem{
      constructor(
            public AppModelItemId?:number, 
            public Name?:string,
            public DataType?:string
      ){} 
}//export class