import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the team, company, and start number in the results table', () => {
    component.dataSource.data = [
      {
        teamName: 'Fast Runners',
        firstName: 'Alex',
        lastName: 'Runner',
        company: 'Acme',
        rank: '1',
        startNumber: 42,
        year: '2026',
        nettoTime: '00:20:00',
      },
    ];
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Fast Runners');
    expect(fixture.nativeElement.textContent).toContain('Acme');
    expect(fixture.nativeElement.textContent).toContain('42');
  });
});
