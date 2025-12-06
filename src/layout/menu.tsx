import { Box } from "@mui/material";
import { People, Twitter } from "@mui/icons-material";

import { MenuItemLink, MenuProps, useSidebarState } from "react-admin";

const Menu = ({ dense = false }: MenuProps) => {
  const [open] = useSidebarState();

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <MenuItemLink
        to="/addresses"
        state={{ _scrollToTop: true }}
        primaryText="Addresses"
        leftIcon={<People />}
        dense={dense}
      />

      <MenuItemLink
        to="/relevant-tweets"
        state={{ _scrollToTop: true }}
        primaryText="Tweets"
        leftIcon={<Twitter />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
