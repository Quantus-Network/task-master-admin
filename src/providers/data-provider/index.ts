import { withLifecycleCallbacks } from "react-admin";

import { baseDataProvider } from "./base-data-provider";

import { addressesLifeCycleCallbacks } from "./resource-lifecycle-callbacks/addresses";

export const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  addressesLifeCycleCallbacks,
]);
