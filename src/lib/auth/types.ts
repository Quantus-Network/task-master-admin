import { Admin } from "@/types/admin";

export interface AuthState {
  admin: Admin | null;
  accessToken: string | null;
  status: "idle" | "signOut" | "signIn";
  signIn: (admin: Admin, accessToken: string) => void;
  signOut: () => void;
  hydrate: () => void;
}

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;
