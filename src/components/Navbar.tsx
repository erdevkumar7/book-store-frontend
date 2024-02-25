import * as React from "react";
import { redirect } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// Mui Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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

export default function Navbar({ cartData }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorCartEl, setAnchorCartEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [userData, setUserData] = React.useState<any>("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isCartMenuOpen = Boolean(anchorCartEl);
  const numberOfItems = cartData?.length;
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

  //profile menu 
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // mobile menu
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
    };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
//cart menu
  const handleCartMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCartEl(event.currentTarget);
  };

  const handleCartMenuClose = () =>{
    setAnchorCartEl(null)
  }




  const cartMenuId = "primary-search-account-menu-cart";
  const cartRenderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={cartMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isCartMenuOpen}
      
      sx={{ marginTop: "25px !important"}}
      onClose={handleCartMenuClose}
    >
      {cartData?.map((card:any) => <MenuItem ><Typography>{card.title}</Typography></MenuItem>)}
    </Menu>
  );


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

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Box>navbar getting cartData: {cartData?.title} </Box> */}

      <AppBar position="static" className={styles.appBarCss}>
        <Toolbar>
          {/* company logo here */}
          <Link href="/profile">
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
              <IconButton 
                size="large"
                edge="end"
                aria-label="cart"
                aria-controls={cartMenuId}
                aria-haspopup="true"
                color="inherit"
                onClick={handleCartMenuOpen}
              >
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
      {cartRenderMenu}
    </Box>
  );
}
