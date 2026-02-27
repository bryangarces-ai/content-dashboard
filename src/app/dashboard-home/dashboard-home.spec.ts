import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardHomeComponent } from './dashboard-home';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHomeComponent, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to thrive when goToThrive is called', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.goToThrive();
    expect(router.navigate).toHaveBeenCalledWith(['/posts/thrive']);
  });

  it('should navigate to mia when goToMia is called', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.goToMia();
    expect(router.navigate).toHaveBeenCalledWith(['/posts/mia']);
  });
});
