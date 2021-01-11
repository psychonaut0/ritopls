import { TestBed } from '@angular/core/testing';

import { RiotapiService } from './riotapi.service';

describe('RiotapiService', () => {
  let service: RiotapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiotapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
