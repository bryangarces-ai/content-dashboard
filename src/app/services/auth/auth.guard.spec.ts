import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
// @ts-ignore
import { AuthService } from '../auth.service';

declare const jasmine: any;

class MockAuth {
  isLoggedIn = false;
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let auth: MockAuth;
  let router: MockRouter;

  beforeEach(() => {
    auth = new MockAuth();
    router = new MockRouter();

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation when logged in', () => {
    auth.isLoggedIn = true;
    expect(guard.canActivate()).toBe(true);
  });

  it('should redirect to login when not logged in', () => {
    auth.isLoggedIn = false;
    expect(guard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
