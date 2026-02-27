export interface Post {
  filename: string;
  date: string;
  time: string;
  title: string;
  content: string;
  source: 'thrive' | 'mia';
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PostsResponse {
  posts: Post[];
  pagination: Pagination;
}
