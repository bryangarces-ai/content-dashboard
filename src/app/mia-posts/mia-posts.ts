import { Component } from '@angular/core';
import { PostsListComponent } from '../shared/posts-list/posts-list.component';

@Component({
  selector: 'app-mia-posts',
  standalone: true,
  imports: [PostsListComponent],
  template: `
    <app-posts-list
      [source]="'mia'"
      badgeLabel="💖 MIA UY"
      badgeColor="success"
      emptyMessage="No MIA posts available."
    ></app-posts-list>
  `
})
export class MiaPostsComponent {}
