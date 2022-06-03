import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types/auth';

import { getRouteWithParam } from '../utils/route';
import { environment as env } from 'src/environments/environment';

import { HttpResponseHandler, HttpService } from './http.service';

@Injectable()
export class AuthService {
  constructor(private _httpService: HttpService, private router: Router) {}

  private JWT_TOKEN_KEY = 'JWT_TOKEN';
  private REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY';
  private USERNAME_KEY = 'USERNAME';
  private USERROLE_KEY = 'USERROLE';

  private _baseApiUrl = getRouteWithParam(env.baseApiUrl, 'v', env.apiVersion);

  login(
    userName: string,
    password: string
  ): HttpResponseHandler<LoginResponse> {
    const payload: LoginRequest = {
      data: {
        userName,
        password,
      },
    };

    return this._httpService
      .post<LoginRequest, LoginResponse>(
        `${this._baseApiUrl}/auth/login`,
        payload
      )
      .then((response) => {
        this.router.navigate(['/users']);
        const jwtToken = response?.data?.accessToken ?? '';
        const refreshToken = response?.data?.refreshToken ?? '';
        const username = response?.data?.user?.login ?? '';
        const userrole = response?.data?.user?.role ?? '';

        this.storeTokens(jwtToken, refreshToken);
        this.storeUser(username, userrole);
      })
      .catch((error) => console.log('Login error', error));
  }

  refreshToken(): HttpResponseHandler<RefreshTokenResponse> {
    const payload: RefreshTokenRequest = {
      data: {
        refreshToken: this.getRefreshToken() ?? '',
      },
    };

    return this._httpService
      .post<RefreshTokenRequest, RefreshTokenResponse>(
        `${this._baseApiUrl}/auth/refresh-token`,
        payload
      )
      .then((response) => {
        console.log('Token successfully refreshed', response);
        const jwtToken = response?.data?.accessToken ?? '';
        const refreshToken = response?.data?.refreshToken ?? '';
        this.storeTokens(jwtToken, refreshToken);
      })
      .catch((error) => console.log('Error of refreshing token', error));
  }

  private storeUser(username: string, userrole: string) {
    this.setUsername(username);
    this.setUserrole(userrole);
  }

  private setUsername(value: string): void {
    localStorage.setItem(this.USERNAME_KEY, value);
  }

  private setUserrole(value: string): void {
    localStorage.setItem(this.USERROLE_KEY, value);
  }

  private storeTokens(jwtToken: string, refreshToken: string) {
    this.setJwtToken(jwtToken);
    this.setRefreshToken(refreshToken);
  }

  private setJwtToken(value: string): void {
    localStorage.setItem(this.JWT_TOKEN_KEY, value);
  }

  private setRefreshToken(value: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, value);
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
  getUserrole(): string | null {
    return localStorage.getItem(this.USERROLE_KEY);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.USERROLE_KEY);
    this.router.navigate(['/']);
  }
}
