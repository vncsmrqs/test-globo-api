import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/* eslint-disable @typescript-eslint/no-unused-vars */
export type RequestConfig = AxiosRequestConfig;
/* eslint-disable @typescript-eslint/no-explicit-any */
export type Response<T = any> = AxiosResponse<T>;

export class Request {
  constructor(private request = axios) {}

  public get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    return this.request.get<T, Response<T>>(url, config);
  }

  public static isRequestError(error: AxiosError): boolean {
    return !!(error.response && error.response.status);
  }
}
