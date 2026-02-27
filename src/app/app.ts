import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgIf],
  template: `
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi bi-grid-3x3-gap-fill me-2"></i>
          Content Dashboard
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul *ngIf="isLoggedIn()" class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/posts/thrive" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Thrive Daily</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/posts/mia" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">MIA UY</a>
            </li>
          </ul>
          <button class="btn btn-outline-primary me-2" (click)="toggleTheme()" type="button">
            <i class="bi" [class.bi-sun-fill]="isDark()" [class.bi-moon-fill]="!isDark()"></i>
            {{ isDark() ? 'Light' : 'Dark' }}
          </button>
          <button *ngIf="isLoggedIn()" class="btn btn-outline-danger" (click)="logout()" type="button">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main class="container-fluid p-3">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    nav {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    main {
      min-height: calc(100vh - 56px);
    }
  `]
})
export class App {
  private themeService = inject(ThemeService);
  private auth = inject(AuthService);
  private router = inject(Router);
  isDark = computed(() => this.themeService.theme() === 'dark');
  isLoggedIn = computed(() => this.auth.isLoggedIn);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
