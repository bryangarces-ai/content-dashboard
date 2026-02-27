import { Component, Input, signal, effect, inject, OnChanges, SimpleChanges, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificationService } from '../services/notification.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Post, Pagination, PostsResponse } from '../models/post.model';
import { PaginationComponent } from '../pagination/pagination.component';
import { PostModalComponent } from '../post-modal/post-modal.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf, PaginationComponent, PostModalComponent],
  templateUrl: './posts-list.component.html',
  // styles can be added later, CSS file exists but removed from metadata to avoid resolution issues
})
export class PostsListComponent implements OnChanges {
  @Input() source: 'thrive' | 'mia' = 'thrive';
  private route = inject(ActivatedRoute);
  // signal representing the latest paramMap from the router
  private paramMapSignal = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  /**
   * Effective source prefers the URL parameter if valid; falls back to input.
   * The signal updates whenever paramMapSignal emits, solving the navigation issue.
   */
  effectiveSource = computed<'thrive' | 'mia'>(() => {
    const param = this.paramMapSignal().get('source');
    if (param === 'thrive' || param === 'mia') {
      return param;
    }
    return this.source;
  });
  @Input() badgeLabel = '';
  @Input() badgeColor = 'primary';
  @Input() emptyMessage = 'No posts found. Generate content first.';

  private contentService = inject(ContentService);
  private notification = inject(NotificationService);

  page = signal(1);
  loading = signal(false);
  error = signal<string | null>(null);
  posts = signal<Post[]>([]);
  pagination = signal<Pagination | null>(null);
  selectedPost = signal<Post | null>(null);
  publishing = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source'] && !changes['source'].firstChange) {
      this.page.set(1);
      this.load();
    }
  }

  constructor() {
    // whenever page or effectiveSource changes, reload posts
    effect(() => {
      const p = this.page();
      const s = this.effectiveSource();
      this.load();
    });
  }

  private load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.posts.set([]);
    this.pagination.set(null);

    this.contentService
      .getPosts(this.effectiveSource(), this.page())
      .subscribe({
        next: (res: PostsResponse) => {
          this.posts.set(res.posts);
          this.pagination.set(res.pagination);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('loadPosts error', err);
          this.error.set(`Failed to load posts. Check console.`);
          this.loading.set(false);
        },
      });
  }

  changePage(page: number): void {
    const pag = this.pagination();
    if (!pag || page < 1 || page > pag.totalPages || page === pag.page) {
      return;
    }
    this.page.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewPost(post: Post): void {
    this.selectedPost.set(post);
  }

  closeModal(): void {
    this.selectedPost.set(null);
  }

  publishPost(): void {
    const sel = this.selectedPost();
    if (!sel) return;
    this.publishing.set(true);
    this.contentService.publishPost(sel.filename).subscribe({
      next: () => {
        this.publishing.set(false);
        this.notification.alert('Marked as published!');
        this.closeModal();
      },
      error: (err) => {
        this.publishing.set(false);
        this.notification.alert('Failed to publish: ' + err.error);
      },
    });
  }

  trackByFilename(index: number, item: Post): string {
    return item.filename;
  }

  /**
   * Simple markdown stripper used for previews so **bold** markers don't appear.
   */
  stripMarkdown(text: string): string {
    return text.replace(/\*\*(.*?)\*\*/g, '$1')
               .replace(/\*(.*?)\*/g, '$1')
               .replace(/`(.*?)`/g, '$1');
  }
}
