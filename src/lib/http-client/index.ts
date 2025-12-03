/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUtils } from "react-admin";
import { API_URL } from "@/constants/env-variables";

type FetchOptions = fetchUtils.Options & { accessToken?: string };

export const httpClient = {
  _baseOptions: (options: FetchOptions, body?: any) => {
    options.headers = new Headers({
      Accept: "application/json",
    });

    if (options.accessToken)
      options.headers.append("Authorization", `Bearer ${options.accessToken}`);

    if (body) options.body = JSON.stringify(body);

    return options;
  },
  _normalizePath: (urlOrPath: string) =>
    urlOrPath.startsWith("/") ? `${API_URL}${urlOrPath}` : urlOrPath,

  get: async (urlOrPath: string, options: FetchOptions = {}) => {
    const url = httpClient._normalizePath(urlOrPath);
    const newOptions = httpClient._baseOptions(options);

    return fetchUtils.fetchJson(url, { ...newOptions, method: "GET" });
  },

  post: async (urlOrPath: string, body: any, options: FetchOptions = {}) => {
    const url = httpClient._normalizePath(urlOrPath);
    const newOptions = httpClient._baseOptions(options, body);

    return fetchUtils.fetchJson(url, {
      ...newOptions,
      method: "POST",
    });
  },

  put: async (urlOrPath: string, body?: any, options: FetchOptions = {}) => {
    const url = httpClient._normalizePath(urlOrPath);
    const newOptions = httpClient._baseOptions(options, body);

    return fetchUtils.fetchJson(url, {
      ...newOptions,
      method: "PUT",
    });
  },

  delete: async (urlOrPath: string, body?: any, options: FetchOptions = {}) => {
    const url = httpClient._normalizePath(urlOrPath);
    const newOptions = httpClient._baseOptions(options, body);

    return fetchUtils.fetchJson(url, {
      ...newOptions,
      method: "DELETE",
    });
  },
};
