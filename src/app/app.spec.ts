import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AuthService } from './services/auth.service';

class MockAuth {
  isLoggedIn = true;
  logout = () => {};
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: AuthService, useValue: new MockAuth() }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navbar brand and logout when logged in', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.navbar-brand')?.textContent).toContain('Content Dashboard');
    expect(compiled.querySelector('button.btn-outline-danger')?.textContent).toContain('Logout');
    expect(compiled.querySelectorAll('.navbar-nav .nav-link').length).toBeGreaterThan(0);
  });
});
