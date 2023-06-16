import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DavengoService } from './davengo.service';

describe('DavengoService', () => {
  let service: DavengoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    }).compileComponents();
    service = TestBed.inject(DavengoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
