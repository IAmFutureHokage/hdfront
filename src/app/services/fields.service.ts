import { Injectable } from '@angular/core';

import {
  DeleteFieldRequest,
  FetchAllFieldsRequest,
  FetchAllFieldsResponse,
  FetchDeleteFieldResponse,
  FetchFieldResponse,
  Field,
  FieldAddRequest,
} from '../types/fields';

import { getRouteWithParam } from '../utils/route';
import { environment as env } from 'src/environments/environment';

import { HttpService, HttpResponseHandler } from './http.service';

@Injectable()
export class FieldsService {
  router: any;
  constructor(private _httpService: HttpService) {}
  public fields: Field[] = [];
  private _baseApiUrl = getRouteWithParam(env.baseApiUrl, 'v', env.apiVersion);

  fetchAll(): HttpResponseHandler<FetchAllFieldsResponse> {
    return this._httpService
      .get<FetchAllFieldsResponse>(`${this._baseApiUrl}/field/get-all`)
      .then((response) => {})
      .catch((error) => {});
  }

  deleteField(id: string): HttpResponseHandler<FetchDeleteFieldResponse> {
    return this._httpService
      .post<DeleteFieldRequest, FetchDeleteFieldResponse>(
        getRouteWithParam(`${this._baseApiUrl}/field/delete/:id`, 'id', id)
      )
      .then((response) => {})
      .catch((error) => {});
  }

  addField(
    id: string,
    cat: string,
    name: string
  ): HttpResponseHandler<FetchFieldResponse> {
    const payload: FieldAddRequest = {
      data: {
        id,
        cat,
        name,
      },
    };
    return this._httpService
      .post<FieldAddRequest, FetchFieldResponse>(
        `${this._baseApiUrl}/field/add`,
        payload
      )
      .then((response) => {})
      .catch((error) => console.log('Add error', error));
  }
}
