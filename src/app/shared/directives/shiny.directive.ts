import { ElementRef, Renderer2, HostListener } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appShiny]'
})
export class ShinyDirective {
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

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'shiny');
  }

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
      percent = (-12 / 7) * position + 40 + (600 / 7);
      if (position >= 15 && position <= 85) {
        this.renderer.setStyle(this.el.nativeElement, 'background-image', 'linear-gradient(110deg, transparent ' + percent + '%, rgba(255, 255, 255, 1) ' + (percent + 10) + '%, transparent ' + (percent + 20) + '%)');
      }
    }
  }

  private clearAnimation() {
    this.renderer.setStyle(this.el.nativeElement, 'background-image', 'none');
  }
}
