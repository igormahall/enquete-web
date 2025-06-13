import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type NotificationType = 'success' | 'error';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification | null>();
  public notification$: Observable<Notification | null> = this.notificationSubject.asObservable();

  constructor() { }

  show(message: string, type: NotificationType = 'success'): void {
    this.notificationSubject.next({ message, type });
  }

  hide(): void {
    this.notificationSubject.next(null);
  }
}
