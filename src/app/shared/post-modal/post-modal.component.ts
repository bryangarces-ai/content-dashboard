import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../models/post.model';
import { MarkdownPipe } from '../markdown.pipe';

@Component({
  selector: 'app-post-modal',
  standalone: true,
  imports: [CommonModule, MarkdownPipe],
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css'],
})
export class PostModalComponent {
  @Input() post: Post | null = null;
  @Input() publishing = false;
  @Output() close = new EventEmitter<void>();
  @Output() publish = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onPublish(): void {
    if (this.post) {
      this.publish.emit();
    }
  }
}
