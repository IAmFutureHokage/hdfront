import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

enum CallbackType {
  Success,
  Error,
  Finally,
}

type SuccessCallback<R> = (response?: R) => void;
type ErrorCallback<E> = (error?: E) => void;
type FinallyCallback = () => void;

export class HttpResponseHandler<Response, Err = Error> {
  private _callbackStack: Record<
    CallbackType,
    SuccessCallback<Response>[] | ErrorCallback<Err>[] | FinallyCallback[]
  > = {
    [CallbackType.Success]: [],
    [CallbackType.Error]: [],
    [CallbackType.Finally]: [],
  };

  constructor(private _observable: Observable<Response>) {}

  then(
    callback: SuccessCallback<Response>
  ): HttpResponseHandler<Response, Err> {
    this._callbackStack[CallbackType.Success].push(callback);
    return this;
  }

  catch(callback: ErrorCallback<Err>): HttpResponseHandler<Response, Err> {
    this._callbackStack[CallbackType.Error].push(callback);
    return this;
  }

  finally(callback: FinallyCallback): HttpResponseHandler<Response, Err> {
    this._callbackStack[CallbackType.Finally].push(callback);
    return this;
  }

  execute(): Observable<Response> {
    this._observable.subscribe({
      next: (response) => {
        this._callbackStack[CallbackType.Success].forEach(
          (callback: SuccessCallback<Response>) => callback(response)
        );
      },
      error: (error) => {
        this._callbackStack[CallbackType.Error].forEach(
          (callback: ErrorCallback<Err>) => callback(error as Err)
        );
      },
      complete: () => {
        this._callbackStack[CallbackType.Finally].forEach(
          (callback: FinallyCallback) => callback()
        );
      },
    });

    return this._observable;
  }
}

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {}

  post<Request = any, Response = any, Err = Error>(
    url: string,
    payload?: Request
  ) {
    return new HttpResponseHandler<Response, Err>(
      this._http.post<Response>(url, payload)
    );
  }

  get<Request = any, Response = any, Err = Error>(
    url: string,
    payload?: Request
  ) {
    return new HttpResponseHandler<Response, Err>(
      this._http.get<Response>(url, payload)
    );
  }
}
