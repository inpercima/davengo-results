import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DavengoService } from './davengo.service';

describe('DavengoService', () => {
  let service: DavengoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    }).compileComponents();
    service = TestBed.inject(DavengoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
