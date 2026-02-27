import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../services/content.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Post } from '../shared/models/post.model';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.html'
})
export class DashboardHomeComponent implements OnInit {
  private contentService = inject(ContentService);
  private router = inject(Router);
  
  loading = signal(true);
  error = signal<string | null>(null);

  totalThrivePosts = signal(0);
  totalMiaPosts = signal(0);
  recentThrive = signal<Post | undefined>(undefined);
  recentMia = signal<Post | undefined>(undefined);

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      thrive: this.contentService.getPosts('thrive'),
      mia: this.contentService.getPosts('mia'),
    }).subscribe({
      next: ({ thrive, mia }) => {
        this.totalThrivePosts.set(thrive.pagination.total);
        this.recentThrive.set(thrive.posts[0]);
        this.totalMiaPosts.set(mia.pagination.total);
        this.recentMia.set(mia.posts[0]);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('loadMetrics error', err);
        this.error.set('Failed to load metrics');
        this.loading.set(false);
      }
    });
  }

  goToThrive(): void {
    this.router.navigate(['/posts/thrive']);
  }

  goToMia(): void {
    this.router.navigate(['/posts/mia']);
  }
}
