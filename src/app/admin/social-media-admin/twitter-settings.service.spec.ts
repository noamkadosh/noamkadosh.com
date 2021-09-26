import { TestBed } from '@angular/core/testing';

import { TwitterSettingsService } from './twitter-settings.service';

describe('TwitterSettingsService', () => {
  let service: TwitterSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
