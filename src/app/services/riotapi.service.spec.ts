import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RiotapiService } from './riotapi.service';

describe('RiotapiService', () => {
  let service: RiotapiService;
  let httpClientSpy: { get: jasmine.Spy };
  let originalTimeout;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(RiotapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
