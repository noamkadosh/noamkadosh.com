import { Type } from '@angular/core';
import { ComponentFactoryResolver, Injectable, ViewChild } from '@angular/core';
import { ErrorComponent } from '../components/error/error.component';
import { HookDirective } from '../directives/hook.directive';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorHost!: HookDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  setHook(elementRef: HookDirective) {
    this.errorHost = elementRef;
  }

  display(component: Type<ErrorComponent>, data: { isSuccess: boolean, message: string }) {
    const errCmpFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const hostViewContainerRef = this.errorHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(errCmpFactory);

    componentRef.instance.isSuccess = data.isSuccess;
    componentRef.instance.message = data.message;
  }
}
