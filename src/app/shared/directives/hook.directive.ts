import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHook]'
})
export class HookDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
