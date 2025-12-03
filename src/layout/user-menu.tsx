import React from "react";
import { UserMenu, Logout } from "react-admin";

export const CustomUserMenu: React.FC = () => (
  <UserMenu>
    <Logout />
  </UserMenu>
);
