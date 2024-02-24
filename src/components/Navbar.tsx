import { Avatar, Box, Grid } from "@mui/material";
import React from "react";

function Navbar() {
  return (
    <>
      <Grid item xs>
        <Box
          component="img"
          src="/img/company_logo.png"
          width={"130px"}
          height={"60px"}
        />
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
