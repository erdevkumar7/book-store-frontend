import * as React from "react";
import { redirect } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// Mui Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Badge, BadgeProps, Typography, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import styles from "../app/styles/appBar.module.css";
import Link from "next/link";
import { HandleLogout } from "@/app/services/userServices";
import { capitalizeFirstLetter } from "@/common/capitalizFirstLetter";
import { isAuthenticated } from "@/common/authToken";
import {} from "../../public/img/company_logo.png";

export default function Navbar({ cartData }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [userData, setUserData] = React.useState<any>("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const numberOfItems = cartData.length;
  const router = useRouter();

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }: any) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  // check the login usability if not not access the page
  React.useLayoutEffect(() => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      redirect("/login");
    }
  }, []);

  // useEffect Start here
  React.useEffect(() => {
    let localData: any, parseLocalData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      parseLocalData = JSON.parse(localData);
      setUserData(JSON.parse(localData));
    }
  }, []);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      {userData && (
        <Box>
          <MenuItem
            onClick={() => {
              router.push("/profile"), handleMenuClose();
            }}
          >
            <Typography>Profile</Typography>
          </MenuItem>
        </Box>
      )}
      <MenuItem onClick={HandleLogout}>
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      sx={{ marginTop: "25px !important" }}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => router.push("/profile")}>
        <Typography variant="body2">
          {capitalizeFirstLetter(userData?.name)}
        </Typography>
      </MenuItem>

      <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
      <MenuItem onClick={HandleLogout}>
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  console.log("creattt", cartData, numberOfItems);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Box>navbar getting cartData: {cartData?.title} </Box> */}

      <AppBar position="static" className={styles.appBarCss}>
        <Toolbar>
          {/* company logo here */}
          <Link href="/">
            <Box
              component="img"
              src="/img/company_logo.png"
              width={"180px"}
              height={"50px"}
              sx={{ display: { xs: "block", sm: "block" } }}
              alt="Company logo"
            />
          </Link>

          {/* add to cart */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box sx={{ margin: "10px" }}>
              {/* <ShoppingCartIcon /> */}
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={numberOfItems} color="info">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Box>
            <Box className={styles.createVrLine}></Box>
            {/* profile image */}
            <Avatar />

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <KeyboardArrowDownOutlinedIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            ></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
