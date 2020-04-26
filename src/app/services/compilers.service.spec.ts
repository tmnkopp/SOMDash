import { TestBed } from '@angular/core/testing';

import { CompilersService } from './compilers.service';

describe('CompilersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompilersService = TestBed.get(CompilersService);
    expect(service).toBeTruthy();
  });
});
