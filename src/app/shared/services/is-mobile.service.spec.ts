import { TestBed } from '@angular/core/testing';

import { IsMobileService } from './is-mobile.service';

describe('IsMobileService', () => {
  let service: IsMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
