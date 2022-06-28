import { Injectable } from '@angular/core';
import { getRouteWithParam } from '../utils/route';
import { environment as env } from 'src/environments/environment';

import { HttpService, HttpResponseHandler } from './http.service';
import { DeleteRequestRequest, DistributeRequestRequest, FetchAllRequestsRequest, FetchAllRequestsResponse, FetchDeleteRequestResponse, FetchRequestRequest, FetchRequestResponse, RequestCreateRequest, RequestCreateResponse, RequestEditRequest, RequestEditResponse, UpdateRequestRequest, UpdateRequestResponse } from '../types/requests';

@Injectable()
export class RequestsService {

  router: any;

  constructor(private _httpService: HttpService) { }

  private _baseApiUrl = getRouteWithParam(env.baseApiUrl, 'v', env.apiVersion);

  fetchRequests(
    searchString: string | null,
    channel: string | null,
    infsys: string | null,
    executorLogin: string | null,
    statuses: number[] | null,
    dateFrom: Date | null,
    dateTo: Date | null,
    page: number | null,
    pageSize: number | null
  ): HttpResponseHandler<FetchAllRequestsResponse> {
    const payload: FetchAllRequestsRequest = {
      data: {
        pagination: {
          page,
          pageSize
        },
        filters: {
          searchString,
          channel,
          infsys,
          executorLogin,
          statuses,
          dateFrom,
          dateTo
        }
      }
    };
    return this._httpService
      .post<FetchAllRequestsRequest, FetchAllRequestsResponse>(
        `${this._baseApiUrl}/item/get-all`,
        payload
      )
      .then((response) => { })
      .catch((error) => { });
  }


  fetchRequest(id: string): HttpResponseHandler<FetchRequestResponse> {
    const payload: FetchRequestRequest = {
      data: {
        id
      },
    };
    return this._httpService
      .post<FetchRequestRequest, FetchRequestResponse>(
        `${this._baseApiUrl}/item/details`,
        payload
      )
      .then((response) => { })
      .catch((error) => { }
      );
  }

  deleteRequest(id: string): HttpResponseHandler<FetchDeleteRequestResponse> {
    const payload: DeleteRequestRequest = {
      data: {
        id
      },
    };
    return this._httpService
      .post<DeleteRequestRequest, FetchDeleteRequestResponse>(
        `${this._baseApiUrl}/item/delete`,
        payload
      )
      .then((response) => { })
      .catch((error) => { });
  }

  editRequest(
    id: string,
    a_name: string,
    a_mail: string,
    theme: string,
    description: string,
    chennal: string,
    infsys: string,
    executorId: string | null
  ): HttpResponseHandler<RequestEditResponse> {
    const payload: RequestEditRequest = {
      data: {
        id,
        a_name,
        a_mail,
        theme,
        description,
        chennal,
        infsys,
        executorId
      },
    };
    return this._httpService
      .post<RequestEditRequest, RequestEditResponse>(
        `${this._baseApiUrl}/item/edit`,
        payload
      )
      .then((response) => { })
      .catch((error) => { });
  }

  addRequest(
    a_name: string,
    a_mail: string,
    theme: string,
    description: string,
    chennal: string,
    infsys: string
  ): HttpResponseHandler<RequestCreateResponse> {
    const payload: RequestCreateRequest = {
      data: {
        a_name,
        a_mail,
        theme,
        description,
        chennal,
        infsys
      },
    };
    return this._httpService
      .post<RequestCreateRequest, RequestCreateResponse>(
        `${this._baseApiUrl}/item/create`,
        payload
      )
      .then((response) => { })
      .catch((error) => { });
  }

  changeStatusRequest(id: string): HttpResponseHandler<UpdateRequestResponse> {
    const payload: UpdateRequestRequest = {
      data: { id },
    };
    return this._httpService
      .post<UpdateRequestRequest, UpdateRequestResponse>(
        `${this._baseApiUrl}/item/change-status`,
        payload
      )
      .then((response) => { })
      .catch((error) => { });
  }

  distributeRequest(id: string, executorId: string | null): HttpResponseHandler<UpdateRequestResponse> {
    const payload: DistributeRequestRequest = {
      data: { id, executorId }
    };
    return this._httpService
      .post<UpdateRequestRequest, UpdateRequestResponse>(
        `${this._baseApiUrl}/item/distribute`,
        payload
      )
      .then((response) => { })
      .catch((error) => { });
  }
}


