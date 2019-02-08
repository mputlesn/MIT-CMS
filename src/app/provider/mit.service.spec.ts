import { TestBed, inject } from '@angular/core/testing';

import { MitService } from './mit.service';

describe('MitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitService]
    });
  });

  it('should be created', inject([MitService], (service: MitService) => {
    expect(service).toBeTruthy();
  }));
});
