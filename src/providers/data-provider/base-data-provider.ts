/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataProvider } from "react-admin";
import { httpClient } from "@/lib/http-client";
import extractErrMsg from "@/utils/extract-error-msg";
import { authStore } from "@/lib/auth";
import { ResourcePack } from "@/lib/resources";

const getOptions = (options: any = {}) => {
  const token = authStore.getState().accessToken;
  return {
    ...options,
    accessToken: token || undefined,
  };
};

const getRecordId = (resource: string, item: any) => {
  if (resource === ResourcePack.Addresses) return item.address.quan_address;

  return item.id;
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

    // React Admin often defaults to 'id', but backend expect others.
    // We map 'id' to  prevent backend errors if no sort is specified.
    const { field, order } = params.sort || {};
    let sortField: string | undefined;
    if (
      field === "id" &&
      [ResourcePack.Addresses, ResourcePack.Tweets].includes(
        resource as ResourcePack,
      )
    )
      sortField = "created_at";
    else if (field === "id" && resource === ResourcePack.TweetAuthors)
      sortField = "username";
    else sortField = field;

    // 'q' is React Admin's standard convention for the main search bar.
    // We map 'q' -> 'search' for the backend.
    const { q, ...otherFilters } = params.filter || {};

    const query: Record<string, string> = {
      page: page.toString(),
      page_size: perPage.toString(),
    };

    if (sortField) query.sort_by = sortField;
    if (order) query.order = order.toLowerCase(); // Rust expects "asc" or "desc" (lowercase)
    if (q) query.search = q;

    // Add all other specific filters (e.g., is_opted_in, min_referrals)
    Object.keys(otherFilters).forEach((key) => {
      const value = otherFilters[key];
      // Only add filter if it has a value (ignore null/undefined)
      if (value !== undefined && value !== null) query[key] = value.toString();
    });

    const queryParams = new URLSearchParams(query);
    const path = `/${resource}?${queryParams.toString()}`;

    const { json } = await httpClient.get(
      path,
      getOptions({ signal: params.signal }),
    );

    return {
      data: json.data.map((item: any) => {
        const originId = getRecordId(resource, item);

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
