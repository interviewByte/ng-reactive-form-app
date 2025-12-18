import { TestBed } from '@angular/core/testing';

import { PracticeSerciceService } from './practice-sercice.service';

describe('PracticeSerciceService', () => {
  let service: PracticeSerciceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeSerciceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
