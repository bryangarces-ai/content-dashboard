import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostModalComponent } from './post-modal.component';
import { MarkdownPipe } from '../markdown.pipe';
import { Post } from '../models/post.model';

describe('PostModalComponent', () => {
  let component: PostModalComponent;
  let fixture: ComponentFixture<PostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostModalComponent, MarkdownPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(PostModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close when close button clicked', () => {
    spyOn(component.close, 'emit');
    component.post = { filename: 'a', date: '', time: '', title: 't', content: 'c', source: 'mia' };
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.btn-close');
    button.click();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit publish when publish button clicked', () => {
    spyOn(component.publish, 'emit');
    component.post = { filename: 'a', date: '', time: '', title: 't', content: 'c', source: 'thrive' };
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button.btn-primary');
    btn.click();
    expect(component.publish.emit).toHaveBeenCalled();
  });
});
