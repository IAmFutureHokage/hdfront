import { Injectable } from '@angular/core';

import {
  DeleteUserRequest,
  FetchAllUsersRequest,
  FetchAllUsersResponse,
  FetchDeleteUserResponse,
  FetchUserRequest,
  FetchUserResponse,
  UserUpdateRequest,
} from '../types/users';

import { getRouteWithParam } from '../utils/route';
import { environment as env } from 'src/environments/environment';

import { HttpService, HttpResponseHandler } from './http.service';

@Injectable()
export class UsersService {
  router: any;
  constructor(private _httpService: HttpService) {}

  private _baseApiUrl = getRouteWithParam(env.baseApiUrl, 'v', env.apiVersion);

  fetchAllUsers(): HttpResponseHandler<FetchAllUsersResponse> {
    return this._httpService
      .get<FetchAllUsersResponse>(`${this._baseApiUrl}/user/get-all`)
      .then((response) => {})
      .catch((error) => {});
  }

  fetchUser(id: string): HttpResponseHandler<FetchUserResponse> {
    return this._httpService
      .post<FetchUserRequest, FetchUserResponse>(
        getRouteWithParam(`${this._baseApiUrl}/user/get/:id`, 'id', id)
      )
      .then((response) => {})
      .catch((error) => {});
  }

  deleteUser(id: string): HttpResponseHandler<FetchDeleteUserResponse> {
    return this._httpService
      .post<DeleteUserRequest, FetchDeleteUserResponse>(
        getRouteWithParam(`${this._baseApiUrl}/user/delete/:id`, 'id', id)
      )
      .then((response) => {})
      .catch((error) => {});
  }

  updateUsers(
    id: string,
    login: string | null,
    newPassword: string | null,
    role: string | null,
    mail: string | null
  ): HttpResponseHandler<FetchDeleteUserResponse> {
    const payload: UserUpdateRequest = {
      data: {
        id,
        login,
        newPassword,
        role,
        mail,
      },
    };
    return this._httpService
      .post<UserUpdateRequest, FetchDeleteUserResponse>(
        `${this._baseApiUrl}/user/update`,
        payload
      )
      .then((response) => {})
      .catch((error) => {});
  }

  addUser(
    id: string,
    login: string,
    newPassword: string,
    role: string,
    mail: string
  ): HttpResponseHandler<FetchUserResponse> {
    const payload: UserUpdateRequest = {
      data: {
        id,
        login,
        newPassword,
        role,
        mail,
      },
    };
    return this._httpService
      .post<UserUpdateRequest, FetchUserResponse>(
        `${this._baseApiUrl}/user/add`,
        payload
      )
      .then((response) => {})
      .catch((error) => console.log('Login error', error));
  }
}
