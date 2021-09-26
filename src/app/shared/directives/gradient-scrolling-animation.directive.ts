import { ElementRef, Renderer2 } from '@angular/core';
import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appGradientScrollingAnimation]'
})
export class GradientScrollingAnimationDirective {
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: MouseEvent){
    if (window.innerWidth > 767) {
      this.isInView();
    }
  }

  @HostListener('window:resize', ['$event']) onResizeEvent($event: MouseEvent){
    if (window.innerWidth <= 767) {
      this.clearAnimation();
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private isInView() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const position = rect.top + ((rect.bottom - rect.top) / 2);
    if (position >= 0 && position <= (window.innerHeight || document.documentElement.clientHeight)) {
      this.setGradient(rect.top + ((rect.bottom - rect.top) / 2));
    } else {
      this.setGradient(false);
    }
  }

  private setGradient(isInViewport: any) {
    let percent;
    if (isInViewport) {
      const position = isInViewport * 100 / window.innerHeight;
      percent = (-0.08444) * (position ** 2) + 8.444 * position - 135.1;
      if (percent < 0) {
        percent = 0;
      }
      this.renderer.setStyle(this.el.nativeElement, 'background-image', 'radial-gradient(rgba(255, 255, 255, 0.125), transparent ' + percent + '%)');
    }
  }

  private clearAnimation() {
    this.renderer.setStyle(this.el.nativeElement, 'background-image', 'radial-gradient(rgba(255, 255, 255, 0.125), transparent 76%)');
  }
}
