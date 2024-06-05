import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { cookies } from "./cookies";

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
};

function defaultResponseHandler(res: AxiosResponse) {
  return res["data"];
}

function createWriteConfig(config: AxiosRequestConfig) {
  return {
    ...config,
    headers: {
      ...config.headers,
      "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
    },
  };
}

const axiosInstance = axios.create(config);

export async function get<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return axiosInstance.get<T>(url, config).then(defaultResponseHandler);
}

export async function post<T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> {
  return axiosInstance.post<T>(url, data, createWriteConfig(config));
}

export async function patch<T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
) {
  return axiosInstance.patch<T>(url, data, createWriteConfig(config));
}

export async function del<T>(url: string, config: AxiosRequestConfig = {}) {
  return axiosInstance.delete<T>(url, createWriteConfig(config));
}
