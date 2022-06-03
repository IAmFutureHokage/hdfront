import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  throwError,
  BehaviorSubject,
  filter,
  take,
  switchMap,
} from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  private static _isRefreshing = false;
  private static _refreshTokenSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Получение хранимого jwt токена
    const jwtToken = this._authService.getJwtToken() ?? '';

    // Добавление токена в заголовок к запросу
    const newRequest = this.getRequestWithToken(request, jwtToken);

    return next.handle(newRequest).pipe(
      // Перехват ошибки
      catchError((error: Error) => {
        // Если пришла ошибка авторизации (401)
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Если токен сейчас не обновляется
          if (!AuthInterceptor._isRefreshing) {
            // Начать его обновление
            AuthInterceptor._isRefreshing = true;
            // Положить в субъект токена пока что значение null
            AuthInterceptor._refreshTokenSubject.next(null);

            // Отправить запрос на обновление токена
            return this._authService
              .refreshToken()
              .execute()
              .pipe(() => {
                // Если запрос успешно завершен
                const newJwtToken = this._authService.getJwtToken() ?? '';

                // Убрать с обновления
                AuthInterceptor._isRefreshing = false;
                // Положить полученный токен в субъект
                AuthInterceptor._refreshTokenSubject.next(newJwtToken);

                // Вернуть обратно перехваченный запрос с установленным новым значением токена
                return next.handle(
                  this.getRequestWithToken(newRequest, newJwtToken)
                );
              });
          } else {
            // Если токен сейчас обновляется
            return AuthInterceptor._refreshTokenSubject.pipe(
              // То подождать пока положенное в субъект значение не будет отличным от null
              filter((token) => token !== null),
              // Взять только первый вызов
              take(1),
              switchMap((token) =>
                // Вернуть обратно перехваченный запрос с установленным новым значением токена
                next.handle(this.getRequestWithToken(newRequest, token))
              )
            );
          }
        } else {
          // Если пришла другая ошибка, то не обрабатывать ее
          return throwError(() => error);
        }
      })
    );
  }

  getRequestWithToken(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
