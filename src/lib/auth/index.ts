/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type Admin } from "@/types/admin";

import { httpClient } from "@/lib/http-client";
import { API_URL } from "@/constants/env-variables";

import type { AuthState } from "./types";
import { createSelectors } from "./utils";

const persistConfig = {
  name: "auth-storage",
};

const _useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      status: "idle",
      admin: null,
      accessToken: null,
      signIn: (admin: Admin, accessToken: string) => {
        set({ status: "signIn", admin, accessToken });
      },
      signOut: () => {
        set({ status: "signOut", accessToken: null, admin: null });
      },
      hydrate: async () => {
        try {
          const { accessToken } = get();
          if (!accessToken) {
            throw new Error("No access token found");
          }

          const { json: checkResp, status } = await httpClient.get(
            `${API_URL}/auth/admin/me`,
            { accessToken },
          );

          if (status !== 200) {
            throw new Error("Hydrate auth failed");
          }

          const admin = checkResp.data as Admin;

          signIn(admin, accessToken);
        } catch (_) {
          get().signOut();
        }
      },
    }),
    persistConfig,
  ),
);

export const authStore = _useAuth;

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (admin: Admin, accessToken: string) =>
  _useAuth.getState().signIn(admin, accessToken);
export const hydrateAuth = async () => _useAuth.getState().hydrate();
