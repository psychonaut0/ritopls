import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DatadragonService } from './datadragon.service';

describe('DatadragonService', () => {
  let service: DatadragonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DatadragonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
