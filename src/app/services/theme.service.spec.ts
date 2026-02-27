import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  const body = document.body;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    service = TestBed.inject(ThemeService);
    // ensure clean state before each test
    body.classList.remove('theme-light', 'theme-dark');
    localStorage.removeItem('dashboard-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with saved value if available', () => {
    localStorage.setItem('dashboard-theme', 'dark');
    service = new ThemeService();
    expect(service.theme()).toBe('dark');
    expect(body.classList.contains('theme-dark')).toBeTrue();
  });

  it('should toggle theme and persist', () => {
    const initial = service.theme();
    service.toggleTheme();
    expect(service.theme()).not.toBe(initial);
    expect(localStorage.getItem('dashboard-theme')).toBe(service.theme());
  });
});
