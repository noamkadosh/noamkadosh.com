import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDot'
})
export class RemoveDotPipe implements PipeTransform {

  transform(str: string) {
    if(str.includes('.')) {
      return str.replace(/\./g, '');
    }
    return str;
  }

}
