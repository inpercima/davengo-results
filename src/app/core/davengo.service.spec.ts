import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DavengoService } from './davengo.service';

describe('DavengoService', () => {
  let service: DavengoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(DavengoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
