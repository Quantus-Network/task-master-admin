import { Box } from "@mui/material";
import { Inbox, People, Twitter } from "@mui/icons-material";

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
        leftIcon={<Inbox />}
        dense={dense}
      />

      <MenuItemLink
        to="/relevant-tweets"
        state={{ _scrollToTop: true }}
        primaryText="Tweets"
        leftIcon={<Twitter />}
        dense={dense}
      />

      <MenuItemLink
        to="/tweet-authors"
        state={{ _scrollToTop: true }}
        primaryText="Tweet Authors"
        leftIcon={<People />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
