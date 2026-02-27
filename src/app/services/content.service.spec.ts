import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContentService } from './content.service';
import { environment } from '../../environments/environment';
import { Post, PostsResponse } from '../shared/models/post.model';

describe('ContentService', () => {
  let service: ContentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentService],
    });

    service = TestBed.inject(ContentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts with pagination params', () => {
    const dummyResp: PostsResponse = {
      posts: [],
      pagination: { total: 0, page: 1, limit: 6, totalPages: 0 }
    };

    service.getPosts('mia', 2, 6).subscribe(res => {
      expect(res).toEqual(dummyResp);
    });

    const req = httpMock.expectOne(
      req => req.url === `${environment.apiBase}/posts` &&
             req.params.get('source') === 'mia' &&
             req.params.get('page') === '2' &&
             req.params.get('limit') === '6'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyResp);
  });

  it('should fetch single post', () => {
    const dummy = { filename: 'file', content: 'hi' };
    service.getPost('file').subscribe(res => {
      expect(res).toEqual(dummy);
    });
    const req = httpMock.expectOne(`${environment.apiBase}/posts/file`);
    expect(req.request.method).toBe('GET');
    req.flush(dummy);
  });

  it('should publish post', () => {
    service.publishPost('file').subscribe(res => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne(`${environment.apiBase}/posts/file/publish`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
