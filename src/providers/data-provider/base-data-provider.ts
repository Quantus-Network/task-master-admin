/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataProvider } from "react-admin";
import { httpClient } from "@/lib/http-client";
import extractErrMsg from "@/utils/extract-error-msg";
import { authStore } from "@/lib/auth";

const getOptions = (options: any = {}) => {
  const token = authStore.getState().accessToken;
  return {
    ...options,
    accessToken: token || undefined,
  };
};

export const baseDataProvider: DataProvider = {
  create: async (resource, params) => {
    const url = `/${resource}`;

    try {
      const { json } = await httpClient.post(url, params.data, getOptions());
      return { data: { ...json, id: json.data } };
    } catch (error) {
      const errMsg = extractErrMsg(error);

      return Promise.reject(errMsg);
    }
  },

  getList: async (resource, params) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };

    const queryParams = new URLSearchParams({
      page: page.toString(),
      page_size: perPage.toString(),
    });

    const path = `/${resource}?${queryParams.toString()}`;

    const { json } = await httpClient.get(
      path,
      getOptions({ signal: params.signal }),
    );

    return {
      data: json.data.map((item: any) => {
        const originId = item.address.quan_address;

        return {
          ...item,
          id: originId,
        };
      }),
      meta: json.meta,
      total: json.meta.total_items,
    };
  },

  getOne: async (resource, params) => {
    const path = `/${resource}/${params.id}`;
    const { json } = await httpClient.get(
      path,
      getOptions({ signal: params.signal }),
    );

    const originId = json.data.address.quan_address;

    return {
      data: {
        ...json.data,
        id: originId,
      },
    };
  },

  getMany: async (resource, params) => {
    const path = `/${resource}`;
    const { json } = await httpClient.get(
      path,
      getOptions({ signal: params.signal }),
    );

    return {
      data: json.data,
      meta: json.meta,
      total: json.meta.total_items,
    };
  },

  getManyReference: async (resource, params) => {
    const path = `/${resource}`;
    const { json } = await httpClient.get(
      path,
      getOptions({ signal: params.signal }),
    );

    return {
      data: json.data,
      total: json.meta.total_items,
    };
  },

  update: async (resource, params) => {
    const path = `/${resource}/${params.id}`;
    const { json } = await httpClient.put(path, params.data, getOptions());
    return { data: { id: params.id, ...json } };
  },

  updateMany: async (resource, params) => {
    const path = `/${resource}`;
    const { json } = await httpClient.put(path, params.data, getOptions());
    return { data: json };
  },

  delete: async (resource, params) => {
    const path = `/${resource}`;
    const { json } = await httpClient.delete(
      path,
      { ids: [params.id] },
      getOptions(),
    );
    return { data: json };
  },

  deleteMany: async (resource, params) => {
    const path = `/${resource}`;
    const { json } = await httpClient.delete(
      path,
      { ids: params.ids },
      getOptions(),
    );
    return { data: json.data };
  },
};
