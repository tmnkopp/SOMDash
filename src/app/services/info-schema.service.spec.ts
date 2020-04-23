import { TestBed } from '@angular/core/testing';

import { InfoSchemaService } from './info-schema.service';

describe('InfoSchemaService', () => {
  let service: InfoSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
