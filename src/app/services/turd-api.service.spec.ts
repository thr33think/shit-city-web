import { TestBed, inject } from '@angular/core/testing';

import { TurdApiService } from './turd-api.service';

describe('TurdApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurdApiService]
    });
  });

  it('should be created', inject([TurdApiService], (service: TurdApiService) => {
    expect(service).toBeTruthy();
  }));
});
