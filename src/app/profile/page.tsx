"use client";
import React, { useLayoutEffect, createContext } from "react";
import { redirect } from "next/navigation";
// MUI Components
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Popover,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
//MUI Icons
import { SearchOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
// Externam CSS
import bookStyle from "../styles/book.module.css";
import styles from "../styles/navbar.module.css";
// Common functions
import { usePagination } from "@/common/pagination";
import { capitalizeFirstLetter } from "@/common/capitalizFirstLetter";
import SpinnerProgress from "@/common/spinnerPgress";
// API calling function
import { HandleGetBooks } from "../services/bookService";
import { Controller, useForm } from "react-hook-form";
import { isAuthenticated } from "@/common/authToken";
import Link from "next/link";
// Create context
export const cartContext: any = createContext("");

interface Column {
  id: "title" | "author" | "category" | "description" | "price" | "add_to_cart";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "title", label: "BOOK NAME", minWidth: 170 },
  { id: "author", label: "BOOK AUTHOR", minWidth: 100 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "description", label: "BOOK DESCRIPTION", minWidth: 100 },
  { id: "price", label: "PRICE($)", minWidth: 100 },
  { id: "add_to_cart", label: "ADD TO CART", minWidth: 100 },
];

function Profile() {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<any>([]);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [getCartDetailsVal, setCartDetailsVal] = React.useState<any>([]);
  const [getFilter, setFilter] = React.useState<number>(0);
  const [filterObject, setFilterObject] = React.useState<any>("");
  //pagination
  const [row_per_page, set_row_per_page] = React.useState(10);
  let [page, setPage] = React.useState<any>(1);
  function handlerowchange(e: any) {
    setPage(1);
    DATA.jump(1);
    set_row_per_page(e.target.value);
  }
  const PER_PAGE = row_per_page;
  const count = Math.ceil(rows?.length / PER_PAGE);
  const startIndex = (page - 1) * row_per_page;
  const endIndex = Math.min(startIndex + row_per_page, rows && rows.length);
  const DATA = usePagination(rows, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };
  // react hook form
  const { handleSubmit, control, reset } = useForm();

  // check the login usability if not not access the page
  useLayoutEffect(() => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      redirect("/login");
    }
  }, []);

  // useEffect
  React.useEffect(() => {
    setLoading(true);
    getAllBooksData("", filterObject);
  }, []);

  const getAllBooksData = (search: any, filterObject: any) => {
    HandleGetBooks(search, filterObject)
      .then((courses) => {
        setLoading(false);
        setRows(courses.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // react hook form submission for fillter book data
  const onSubmit = (event: any) => {
    console.log("even", event);
    HandleGetBooks("", event).then((itemFiltered) => {
      setRows(itemFiltered.data);
      setFilterObject(event);
    });
  };
  // filter books data
  const resetFilterValue = () => {
    setFilter(0);
    reset({ author: 0, category: 0 });
    getAllBooksData("", { author: 0, category: 0 });
  };

  const handleSearch = (e: any, identifier: any) => {
    setPage(1);
    if (page !== 1) {
      DATA.jump(1);
    }
    if (identifier === "reset") {
      getAllBooksData("", { author: 0, category: 0 });
      setSearch(e);
    } else {
      const search = e.target.value;
      setSearch(e.target.value);
      getAllBooksData(search, filterObject);
    }
  };

  const handleSort = (rowsData: any) => {
    // const sortData = handleSortData(rowsData);
    // setRows(sortData);
    // setToggle(!toggle);
  };

  // Function to handle adding items to the cart
  const setCartDetails = (row: any) => {
    setCartDetailsVal([...getCartDetailsVal, row]);
  };

  // Function to handle removing items from the cart
  const handleRemoveFromCart = (itemId: any) => {
    const indexToRemove = getCartDetailsVal.findIndex(
      (item: any) => item._id === itemId
    );
    if (indexToRemove !== -1) {
      const updatedCart = [
        ...getCartDetailsVal.slice(0, indexToRemove),
        ...getCartDetailsVal.slice(indexToRemove + 1),
      ];
      setCartDetailsVal(updatedCart);
    }
  };

  return (
    <>
      {/* navigation bar component */}
      <Navbar cartData={getCartDetailsVal} />
      {/* book listing - main content */}
      <Box className={styles.combineContentAndSidebar}>
        <Box className={styles.siteBodyContainer}>
          {/* main content */}
          <Card>
            <CardContent>
              {/* Serach Book */}
              <TextField
                id="standard-search"
                value={search}
                variant="outlined"
                placeholder="Search by Book Name"
                onChange={(e) => handleSearch(e, "")}
                InputProps={{
                  endAdornment: !search ? (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ) : (
                    <IconButton onClick={(e) => handleSearch("", "reset")}>
                      {" "}
                      <CloseIcon />
                    </IconButton>
                  ),
                }}
              />
              {/* book filter */}
              <Box className={bookStyle.upperFilterBox}>
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <Box>
                      <Button
                        className={bookStyle.filterAltOutlinedIcon}
                        {...bindTrigger(popupState)}
                      >
                        <FilterAltOutlinedIcon />
                        Filter
                      </Button>
                      <Popover
                        {...bindPopover(popupState)}
                        style={{ width: "35% !important" }}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box>
                          <Container
                            className="filter-box"
                            style={{ padding: "15px" }}
                          >
                            <Grid>
                              <Typography
                                variant="h5"
                                className={bookStyle.filterTypography}
                              >
                                Filter
                              </Typography>
                              <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                              >
                                <Stack
                                  style={{ marginTop: "10px" }}
                                  className="form-filter"
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={6}>
                                      <Stack spacing={2}>
                                        <InputLabel
                                          htmlFor="enddate"
                                          className={bookStyle.typeFreePaid}
                                        >
                                          Author
                                        </InputLabel>
                                        <Controller
                                          name="author"
                                          control={control}
                                          defaultValue={getFilter}
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty>
                                                <MenuItem value={0}>
                                                  All
                                                </MenuItem>
                                                <MenuItem value={"rd sharma"}>
                                                  RD sharma
                                                </MenuItem>
                                                <MenuItem value={"rajveer"}>
                                                  Rajveer
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          )}
                                        />
                                      </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                      <Stack spacing={2}>
                                        <InputLabel
                                          htmlFor="enddate"
                                          className={bookStyle.statusBold}
                                        >
                                          Category
                                        </InputLabel>
                                        <Controller
                                          name="category"
                                          control={control}
                                          defaultValue={getFilter}
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty>
                                                <MenuItem value={0}>
                                                  All
                                                </MenuItem>
                                                <MenuItem value={"academic"}>
                                                  Acadedmic
                                                </MenuItem>
                                                <MenuItem value={"fiction"}>
                                                  Fiction
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          )}
                                        />
                                      </Stack>
                                    </Grid>

                                    <Grid item xs={12} lg={12}>
                                      <Box className={bookStyle.boxInFilter}>
                                        <Button
                                          size="medium"
                                          variant="contained"
                                          color="primary"
                                          type="button"
                                          onClick={() => {
                                            resetFilterValue();
                                            popupState.close();
                                          }}
                                        >
                                          Reset
                                        </Button>
                                        <Button
                                          size="medium"
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          className={
                                            bookStyle.applyButtonInFiltter
                                          }
                                          onClick={popupState.close}
                                        >
                                          Apply
                                        </Button>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Stack>
                              </Box>
                            </Grid>
                          </Container>
                        </Box>
                      </Popover>
                    </Box>
                  )}
                </PopupState>
              </Box>
              <Paper>
                <TableContainer className={bookStyle.tableContainer}>
                  <Table stickyHeader aria-label="sticky table">
                    {/* table head */}
                    <TableHead>
                      <TableRow>
                        {columns?.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ top: 0, minWidth: column.minWidth }}
                            onClick={() => {
                              column.label === "ID" ? handleSort(rows) : "";
                            }}
                            className={bookStyle.tableHeadingForId}
                          >
                            {column.label === "ID" ? (
                              <>
                                {column.label}
                                {toggle ? (
                                  <ArrowDownwardOutlinedIcon fontSize="small" />
                                ) : (
                                  <ArrowUpwardOutlinedIcon fontSize="small" />
                                )}
                              </>
                            ) : (
                              column.label
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {/* table body */}

                    <TableBody>
                      {!loading ? (
                        rows && rows.length > 0 ? (
                          DATA.currentData() &&
                          DATA.currentData().map((row: any) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row._id}
                              >
                                {/* book title */}
                                <TableCell>
                                  <Link
                                    href={`/book/${row?._id}`}
                                    style={{ color: "#1976d2" }}
                                  >
                                    {capitalizeFirstLetter(row?.title)}
                                  </Link>
                                </TableCell>

                                {/* book author */}
                                <TableCell>
                                  {capitalizeFirstLetter(row?.author)}
                                </TableCell>
                                {/* book category */}
                                <TableCell>
                                  {capitalizeFirstLetter(row?.category)}
                                </TableCell>
                                {/* book description */}
                                <TableCell>
                                  {capitalizeFirstLetter(row?.description)}
                                </TableCell>
                                {/* book price */}
                                <TableCell>{row?.price}</TableCell>
                                {/* addToCart */}
                                <TableCell>
                                  <Button onClick={() => setCartDetails(row)}>
                                    Add
                                  </Button>
                                  {/* removeToCart */}
                                  <Button
                                    onClick={() =>
                                      handleRemoveFromCart(row?._id)
                                    }
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              className={bookStyle.tableLastCell}
                              sx={{ fontWeight: 600 }}
                            >
                              {" "}
                              Record not found{" "}
                            </TableCell>
                          </TableRow>
                        )
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className={bookStyle.tableLastCell}
                          >
                            <SpinnerProgress />{" "}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <Stack
                    className={bookStyle.stackStyle}
                    direction="row"
                    alignItems="right"
                    justifyContent="space-between"
                  >
                    <Pagination
                      className="pagination"
                      count={count}
                      page={page}
                      color="primary"
                      onChange={handlePageChange}
                    />
                    <Box>
                      <Typography
                        component={"span"}
                        mr={2}
                        className="paginationShowinig"
                      >
                        Showing {endIndex} of {rows && rows.length} Results
                      </Typography>
                      <FormControl>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={10}
                          onChange={handlerowchange}
                          size="small"
                          style={{ height: "40px", marginRight: "11px" }}
                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={30}>30</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Stack>
                </TableContainer>
              </Paper>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
