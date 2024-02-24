"use client";

import Navbar from "@/components/Navbar";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import { SearchOutlined } from "@mui/icons-material";
//MUI Icons
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
// Externam CSS
import bookStyle from "../styles/book.module.css";
//Common functions
import { usePagination } from "@/common/pagination";
import { capitalizeFirstLetter } from "@/common/capitalizFirstLetter";
import SpinnerProgress from "@/common/spinnerPgress";
import { HandleGetBooks } from "../services/bookService";

interface Column {
  id: "title" | "auther" | "description" | "price" | "add_to_cart";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "title", label: "BOOK NAME", minWidth: 170 },
  { id: "auther", label: "BOOK AUTHER", minWidth: 100 },
  { id: "description", label: "BOOK DESCRIPTION", minWidth: 100 },
  { id: "price", label: "PRICE($)", minWidth: 100 },
  { id: "add_to_cart", label: "ADD TO CART", minWidth: 100 },
];

function Profile() {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<any>([]);
  const [toggle, setToggle] = React.useState<boolean>(false);
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
 // useEffect
  React.useEffect(() => {
    setLoading(true);
    getAllBooksData();
  }, []);

  const getAllBooksData = () => {
    HandleGetBooks()
      .then((courses) => {
        setLoading(false);
        setRows(courses.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleSearch = (e: any, identifier: any) => {
    // setPage(1);
    // if (page !== 1) {
    //   DATA.jump(1);
    // }
    // if (identifier === "reset") {
    //   getAllCourseData("", { is_chargeable: 0, status: 0 });
    //   setSearch(e);
    // } else {
    //   const search = e.target.value;
    //   setSearch(e.target.value);
    //   getAllCourseData(search, filterObject);
  };

  const handleSort = (rowsData: any) => {
    // const sortData = handleSortData(rowsData);
    // setRows(sortData);
    // setToggle(!toggle);
  };


  console.log('rows',rows)

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        <Navbar />
      </Grid>
      {/* book listing - main content */}
      <Card>
        <CardContent>
          {/* Serach Book */}
          <TextField
            id="standard-search"
            value={search}
            variant="outlined"
            placeholder="Search Book"
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
                              {capitalizeFirstLetter(row?.title)}
                            </TableCell>
                            {/* book author */}
                            <TableCell>
                              {capitalizeFirstLetter(row?.author)}
                            </TableCell>
                            {/* book description */}
                            <TableCell>
                              {capitalizeFirstLetter(row?.description)}
                            </TableCell>
                            {/* book price */}
                            <TableCell>
                              { row?.price}
                            </TableCell>
                       
                            <TableCell>
                              <Button >Add</Button>
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
            </TableContainer>
          </Paper>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Profile;
