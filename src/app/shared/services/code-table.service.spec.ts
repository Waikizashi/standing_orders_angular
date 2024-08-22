import { TestBed } from '@angular/core/testing';

import { CodeTableService } from './code-table.service';

describe('CodeTableService', () => {
  let service: CodeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
