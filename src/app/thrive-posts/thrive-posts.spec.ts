import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrivePostsComponent } from './thrive-posts';

describe('ThrivePostsComponent', () => {
  let component: ThrivePostsComponent;
  let fixture: ComponentFixture<ThrivePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThrivePostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThrivePostsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
