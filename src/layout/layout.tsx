import * as React from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";

import AppBar from "./app-bar";
import Menu from "./menu";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <RALayout appBar={AppBar} menu={Menu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
};

export default Layout;
