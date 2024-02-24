"use client";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./styles/login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginValidations } from "../validation_schema/userValidation";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { redirect } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { HandleLogin } from "../services/userServices";

const defaultTheme = createTheme();

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(userLoginValidations) });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (event: any) => {
    setLoading(true);

    console.log("event", event);
    await HandleLogin(event)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("loginToken", res.data.loginToken);
          localStorage.setItem(
            "userData",
            JSON.stringify(res.data.userDetails)
          );
          router.push("/profile");
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  function ErrorShowing(errorMessage: any) {
    return (
      <Typography variant="body2" color={"error"} gutterBottom>
        {errorMessage}{" "}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            component={"img"}
            src={"/img/login3.jpg"}
            width={"100%"}
            height={"100%"}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              method="POST"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              // className={styles.mainBoxContentForm}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="outlined-email"
                label="Email Address"
                autoFocus
                {...register("email")}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                id="outlined-password"
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />

              {errors && errors.email
                ? ErrorShowing(errors?.email?.message)
                : ""
                ? errors && errors.email
                  ? ErrorShowing(errors?.email?.message)
                  : ""
                : errors && errors.password
                ? ErrorShowing(errors?.password?.message)
                : ""}

              {!loading ? (
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // className={styles.mainBoxButton}
                >
                  Sign In
                </Button>
              ) : (
                <LoadingButton
                  loading={loading}
                  fullWidth
                  size="large"
                  // className={styles.mainBoxButton}
                  variant="outlined"
                  disabled
                >
                  <CircularProgress color="inherit" size={"1.6rem"} />
                </LoadingButton>
              )}

              <Grid container>
                <Grid item>
                  Don&lsquo;t have an account?
                  <Link href="/registration" style={{ color: "#1976d2" }}>
                    {" "}
                    Create Now
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}
