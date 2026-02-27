import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { calculatePageWindow } from '../utils/pagination.util';
import { Pagination } from '../models/post.model';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() pagination: Pagination | null = null;
  @Input() maxVisible = 5;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return this.pagination ? calculatePageWindow(this.pagination, this.maxVisible) : [];
  }

  goTo(page: number): void {
    if (!this.pagination) return;
    if (page < 1 || page > this.pagination.totalPages) return;
    if (page === this.pagination.page) return;
    this.pageChange.emit(page);
  }
}
