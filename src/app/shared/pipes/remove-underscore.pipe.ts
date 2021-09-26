import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})

export class RemoveUnderscorePipe implements PipeTransform {
  transform(str: string) {
    if(str.includes('_')) {
      return str.replace(/_/g, ' ');
    }
    return str;
  }
}
