import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export interface Credentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiBase = environment.apiBase;

  /** holds the current token, starts from localStorage if present */
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );

  /** observable clients may subscribe to */
  readonly token$ = this.tokenSubject.asObservable();

  /** true when a non‑empty token exists */
  get isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  /**
   * POST credentials, expect {token}
   * on success persist token and update subject
   */
  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiBase}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.tokenSubject.next(res.token);
        })
      );
  }

  /** clear stored token and notify subscribers */
  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
