import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceBreaksToBr'
})
export class ReplaceBreaksToBrPipe implements PipeTransform {

    transform(
        value: string
        , item: string
        ): string {
        value = value.replace(/\$0/g, item); 
        value = value.replace(/</g, `&lt;`); 
        value = value.replace(/>/g, `&gt;`); 
        value = value.replace(/\n/g, `<br/>`); 
   
        return value;
      }

}
