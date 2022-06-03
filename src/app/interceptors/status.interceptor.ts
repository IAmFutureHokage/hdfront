import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  take,
  switchMap,
  mergeMap,
  map,
  of,
  filter,
  fromEvent,
  tap,
} from 'rxjs';

// Статусы ошибки
const errorStatuses: number[] = [1];

@Injectable()
export class StatusInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Response>> {
    // Перехватить запрос
    return next.handle(request).pipe<HttpEvent<Response>>(
      // Взять ответ
      tap((event) => {
        // Если пришли корректные данные, но при этом у них есть статус ошибки
        if (
          event instanceof HttpResponse &&
          event.body !== null &&
          errorStatuses.includes(event.body.status)
        ) {
          // Выбросить исключение
          throw new Error(`Returned response with status ${event.body.status}`);
        }
      })
    );
  }
}
