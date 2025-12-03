/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthProvider } from "react-admin";

import { httpClient } from "@/lib/http-client";
import { API_URL } from "@/constants/env-variables";
import { useAuth, signIn, signOut } from "@/lib/auth";
import { Admin } from "@/types/admin";

interface LoginPayload {
  username: string;
  password: string;
}

export const authProvider: AuthProvider = {
  async login({ username, password }: LoginPayload) {
    const { json: loginResp } = await httpClient.post(
      `${API_URL}/auth/admin/login`,
      { username, password },
    );

    const accessToken = loginResp.access_token as string;

    const { json: checkResp } = await httpClient.get(
      `${API_URL}/auth/admin/me`,
      { accessToken },
    );

    signIn(checkResp.data as Admin, accessToken);
  },
  async checkError(error: any) {
    const status = error.status;
    if (status === 401 || status === 403) {
      signOut();
      throw new Error();
    }
  },
  async checkAuth() {
    if (useAuth.getState().status === "signOut") {
      throw new Error();
    }
  },
  async logout() {
    signOut();
  },
  async getIdentity() {
    const { id = "", username } = useAuth.getState().admin || {};

    return Promise.resolve({
      id,
      fullName: username,
      avatar: "/qc.png",
    });
  },
};
