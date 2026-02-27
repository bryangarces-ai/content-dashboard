import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { Pagination } from '../models/post.model';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate pages correctly', () => {
    const pagination: Pagination = { total: 100, page: 5, limit: 10, totalPages: 10 };
    component.pagination = pagination;
    component.maxVisible = 5;
    fixture.detectChanges();
    expect(component.pages.length).toBeGreaterThan(0);
    expect(component.pages).toContain(5);
  });

  it('should emit pageChange when goTo is called with valid page', () => {
    component.pagination = { total: 50, page: 1, limit: 10, totalPages: 5 };
    spyOn(component.pageChange, 'emit');
    component.goTo(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should not emit pageChange when page is out of range', () => {
    component.pagination = { total: 20, page: 1, limit: 10, totalPages: 2 };
    spyOn(component.pageChange, 'emit');
    component.goTo(0);
    component.goTo(3);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });
});
