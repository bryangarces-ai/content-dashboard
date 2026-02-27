import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListComponent } from './posts-list.component';
import { ContentService } from '../../services/content.service';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// jasmine globals may not be recognized by TS in this environment
declare const spyOn: any;
import { of, throwError } from 'rxjs';
import { Post, PostsResponse } from '../models/post.model';

// fake route to simulate parameter changes
class FakeActivatedRoute {
  private subject = new BehaviorSubject<ParamMap>(convertToParamMap({ source: 'thrive' }));
  readonly paramMap = this.subject.asObservable();
  readonly snapshot = { paramMap: this.subject.value };

  setSource(src: 'thrive' | 'mia') {
    this.subject.next(convertToParamMap({ source: src }));
  }
}

class MockContentService {
  getPosts(source: 'thrive' | 'mia', page = 1) {
    const response: PostsResponse = {
      posts: [{ filename: '1', date: '', time: '', title: 't', content: '', source }],
      pagination: { total: 1, page, limit: 6, totalPages: 1 }
    };
    return of(response);
  }
  publishPost(filename: string) {
    return of({});
  }
}

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let service: MockContentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsListComponent],
      providers: [
        { provide: ContentService, useClass: MockContentService },
        { provide: NotificationService, useValue: { alert: () => {} } },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ContentService) as unknown as MockContentService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    expect(component.posts().length).toBe(1);
    expect(component.pagination()?.total).toBe(1);
  });

  it('should change page when pageChange event emitted', () => {
    component.pagination.set({ total: 20, page: 1, limit: 6, totalPages: 4 });
    component.changePage(2);
    expect(component.page()).toBe(2);
  });

  it('should update effectiveSource when route parameter changes', () => {
    const route = TestBed.inject(ActivatedRoute) as unknown as FakeActivatedRoute;
    expect(component.effectiveSource()).toBe('thrive');
    route.setSource('mia');
    // effect should run automatically
    expect(component.effectiveSource()).toBe('mia');
  });

  it('should handle errors from service', () => {
    spyOn(service, 'getPosts').and.returnValue(throwError(() => new Error('fail')));
    // trigger reload by setting page
    component.page.set(1);
    expect(component.error()).toContain('Failed to load posts');
  });
});
