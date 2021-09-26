import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceToDash'
})
export class SpaceToDashPipe implements PipeTransform {

  transform(str: string) {
    if(str.includes(' ')) {
      return str.replace(/ /g, '-');
    } else if (str.includes('#')) {
      return str.replace(/#/g, '-sharp');
    }
    return str;
  }

}
