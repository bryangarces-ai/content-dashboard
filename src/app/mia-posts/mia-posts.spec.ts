import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiaPostsComponent } from './mia-posts';

describe('MiaPostsComponent', () => {
  let component: MiaPostsComponent;
  let fixture: ComponentFixture<MiaPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiaPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiaPostsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
