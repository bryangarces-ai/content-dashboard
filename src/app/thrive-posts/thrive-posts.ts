import { Component } from '@angular/core';
import { PostsListComponent } from '../shared/posts-list/posts-list.component';

@Component({
  selector: 'app-thrive-posts',
  standalone: true,
  imports: [PostsListComponent],
  template: `
    <app-posts-list
      [source]="'thrive'"
      badgeLabel="🚀 Thrive Daily"
      badgeColor="primary"
      emptyMessage="No Thrive posts available."
    ></app-posts-list>
  `
})
export class ThrivePostsComponent {}
