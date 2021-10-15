import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceLineBreaks'
})
export class ReplaceLineBreaks implements PipeTransform {
    transform(value: string): string {
        return value.replace(/\n/g, '<br/>');
      }
} 
