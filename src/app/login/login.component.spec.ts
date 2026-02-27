import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
// @ts-ignore: service will be resolved at runtime
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';

// make vitest/ts happy about jasmine-global in legacy tests
declare const jasmine: any;

class MockAuth {
  login = jasmine.createSpy('login');
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: MockAuth;
  let router: MockRouter;

  beforeEach(async () => {
    auth = new MockAuth();
    router = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on successful login', () => {
    auth.login.and.returnValue(of({ token: 'x' }));
    component.username = 'u';
    component.password = 'p';
    component.submit();
    expect(auth.login).toHaveBeenCalledWith({ username: 'u', password: 'p' });
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display error on failure', () => {
    auth.login.and.returnValue(throwError(() => ({ error: { message: 'bad' } })));
    component.username = 'u';
    component.password = 'p';
    component.submit();
    expect(component.error).toBe('bad');
  });
});
