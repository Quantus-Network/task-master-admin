import { AppBar, TitlePortal } from "react-admin";
import { CustomUserMenu } from "./user-menu";

const CustomAppBar = () => {
  return (
    <AppBar color="secondary" userMenu={<CustomUserMenu />}>
      <TitlePortal />
    </AppBar>
  );
};

export default CustomAppBar;
