import { TestBed } from '@angular/core/testing';

import { IsNotFoundService } from './is-not-found.service';

describe('IsNotFoundService', () => {
  let service: IsNotFoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsNotFoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
