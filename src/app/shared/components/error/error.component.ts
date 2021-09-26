import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  animations: [
    trigger('hide', [
      state(
        'visible',
        style({
          opacity: '1'
        })
      ),
      state(
        'hidden',
        style({
          opacity: '0',
          zIndex: '-1'
        })
      ),
      transition('visible => hidden', [animate('1500ms ease-out')])
    ])
  ]
})
export class ErrorComponent implements AfterViewInit {

  @Input() isSuccess: boolean = true;
  @Input() message: string = '';
  isHidden: boolean = false;

  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isHidden = true;
    }, 3500);
  }
}
