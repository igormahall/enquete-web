import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timer } from 'rxjs';

export const timeoutRetryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    // Tenta novamente a requisição em caso de erro
    retry({
      count: 2, // Tenta a requisição original + 2 re-tentativas
      delay: (error, retryCount) => {
        // Espera 2 segundos antes da primeira re-tentativa, 4 para a segunda...
        return timer(retryCount * 2000);
      }
    })
  );
};
