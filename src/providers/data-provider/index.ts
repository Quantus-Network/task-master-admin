import { withLifecycleCallbacks } from "react-admin";

import { baseDataProvider } from "./base-data-provider";

export const dataProvider = withLifecycleCallbacks(baseDataProvider, []);
