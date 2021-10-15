import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snippetFormater'
})
export class SnippetFormaterPipe implements PipeTransform {

    transform(
        value: string
        , item: string
        , item1: string
        , item2: string
        ): string {
        value = value.replace(/\$0/g, item);  
        value = value.replace(/\$1/g, item1); 
        value = value.replace(/\$2/g, item2); 
        value = value.replace(/\t/g, `&nbsp;&nbsp;&nbsp;&nbsp;`); 
        value = value.replace(/</g, `&lt;`); 
        value = value.replace(/>/g, `&gt;`); 
        value = value.replace(/\n/g, `<br/>`); 
   
        return value;
      }

}
