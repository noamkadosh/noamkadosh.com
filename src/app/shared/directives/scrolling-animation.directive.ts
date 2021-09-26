import { HostListener } from '@angular/core';
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollingAnimation]'
})
export class ScrollingAnimationDirective {
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
    if (rect.bottom >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
      this.setOpacity(rect.top);
    } else {
      this.setOpacity(false);
    }
  }

  private setOpacity(isInViewport: any) {
    let opacity;
    if (isInViewport) {
      const position = isInViewport * 100 / window.innerHeight;
      opacity = (- (position ** 2) + 90 * position) / 2025;
      if (opacity < 0) {
        opacity = 0;
      }
      this.renderer.setStyle(this.el.nativeElement, 'opacity', opacity);
    }
  }

  private clearAnimation() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 1);
  }
}
