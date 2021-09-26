import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})

export class ToDatePipe implements PipeTransform {

  month_convertion = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  transform(str: string) {
    str = str.substring(0, 10);
    const regex = new RegExp('([0-9]{4})-([0-9]{2})-([0-9]{2})')
    const match = regex.exec(str);
    let dd = '', mm = '', yyyy = '';
    if (match !== null) {
      dd = match[3];
      mm = this.month_convertion[+match[2] - 1];
      yyyy = match[1];
    }

    return mm + ' ' + dd + ', ' + yyyy;
  }
}
