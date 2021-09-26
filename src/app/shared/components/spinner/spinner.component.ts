import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
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
      state(
        'visible-non-animated',
        style({
          opacity: '1'
        })
      ),
      state(
        'hidden-non-animated',
        style({
          opacity: '0',
          zIndex: '-1'
        })
      ),
      transition('visible => hidden', [animate('750ms ease-out')]),
      transition('visible-non-animated => hidden-non-animated', [animate('0ms')])
    ])
  ]
})
export class SpinnerComponent implements OnInit {

  @Input() isHidden!: any;
  @Input() animated: boolean = true;
  @Input() isTransparent: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
