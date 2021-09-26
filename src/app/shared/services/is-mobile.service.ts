import { Injectable, ApplicationRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private applicationRef: ApplicationRef,
    private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => applicationRef.tick();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
