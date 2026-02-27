import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';
  readonly theme = signal<'light' | 'dark'>(this.currentTheme);

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const saved = localStorage.getItem('dashboard-theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = saved || (prefersDark ? 'dark' : 'light');
    // apply current theme using the shared setter logic
    this.setTheme(this.currentTheme);
  }

  toggleTheme(): void {
    const next = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  private setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    this.theme.set(theme);
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(`theme-${theme}`);
    localStorage.setItem('dashboard-theme', theme);
  }
}
