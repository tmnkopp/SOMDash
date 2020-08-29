import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snippetFormater'
})
export class SnippetFormaterPipe implements PipeTransform {

    transform(
        value: string
        , item: string
        ): string {
        value = value.replace(/\$0/g, item);  
        value = value.replace(/\t/g, `&nbsp;&nbsp;&nbsp;&nbsp;`); 
        value = value.replace(/</g, `&lt;`); 
        value = value.replace(/>/g, `&gt;`); 
        value = value.replace(/\n/g, `<br/>`); 
   
        return value;
      }

}
