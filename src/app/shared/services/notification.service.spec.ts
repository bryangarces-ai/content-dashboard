import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NotificationService] });
    service = TestBed.inject(NotificationService);
    spyOn(window, 'alert');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call window.alert', () => {
    service.alert('hello');
    expect(window.alert).toHaveBeenCalledWith('hello');
  });
});
