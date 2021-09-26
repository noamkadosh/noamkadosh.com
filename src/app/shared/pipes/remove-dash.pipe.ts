import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDash'
})

export class RemoveDashPipe implements PipeTransform {
  transform(str: string) {
    if(str.includes('-')) {
      return str.replace(/-/g, ' ');
    }
    return str;
  }
}
