import { HandleLogout } from "@/app/services/userServices";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      sx={{ marginTop: "25px !important" }}
      onClose={handleMenuClose}
    >
      <MenuItem >
        <Typography>Profile</Typography>
      </MenuItem>

      <MenuItem onClick={HandleLogout}>
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Grid item xs>
        <Box
          component="img"
          src="/img/company_logo.png"
          width={"130px"}
          height={"60px"}
          />
          {renderMenu}
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item sx={{ display: "block" }} xs>
        <Grid sx={{ float: "right", padding: "20px" }}>
          <Avatar />
        </Grid>
      </Grid>
    </>
  );
}

export default Navbar;
