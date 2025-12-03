import { ResourceCallbacks } from "react-admin";

import { ResourcePack } from "@/lib/resources";

export const addressesLifeCycleCallbacks: ResourceCallbacks = {
  resource: ResourcePack.Addresses,

  beforeGetList: async (params) => {
    return Promise.resolve({
      ...params,
    });
  },
};
