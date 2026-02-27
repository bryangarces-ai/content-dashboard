import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  /**
   * Simple wrapper around window.alert for now; can be replaced with
   * a toast component later.
   */
  alert(message: string): void {
    window.alert(message);
  }
}
