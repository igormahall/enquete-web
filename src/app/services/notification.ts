import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Expandido para suportar mais tipos visuais de notificação
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Sujeito que emite a notificação atual
  private notificationSubject = new Subject<Notification | null>();

  // Observable que os componentes podem assinar
  public notification$: Observable<Notification | null> = this.notificationSubject.asObservable();

  constructor() {}

  /**
   * Exibe uma notificação com mensagem e tipo.
   * @param message - Texto da notificação
   * @param type - Tipo da notificação: 'success', 'error', 'warning' ou 'info'
   */
  show(message: string, type: NotificationType = 'success'): void {
    this.notificationSubject.next({ message, type });
  }

  /**
   * Oculta a notificação atual.
   */
  hide(): void {
    this.notificationSubject.next(null);
  }
}
