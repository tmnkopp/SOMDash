import { TestBed } from '@angular/core/testing';

import { ScaffoldService } from './scaffold.service';

describe('ScaffoldService', () => {
  let service: ScaffoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScaffoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
