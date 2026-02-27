import { Pagination } from '../models/post.model';

/**
 * Compute a window of page numbers given the current pagination state.
 * The result will contain at most `maxVisible` pages centered around the
 * current page. Used by components to render pagination controls.
 */
export function calculatePageWindow(pagination: Pagination, maxVisible = 5): number[] {
  const pages: number[] = [];
  let start = Math.max(1, pagination.page - Math.floor(maxVisible / 2));
  let end = Math.min(pagination.totalPages, start + maxVisible - 1);

  // adjust start if we truncated at the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}
