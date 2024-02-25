"use client";
import React, { useEffect } from "react";
import { HandleGetBookById } from "@/app/services/bookService";
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
//CSS Styling
import styles from "../../styles/navbar.module.css";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/common/capitalizFirstLetter";
function BookById({ params }: any) {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<any>([]);
  const router = useRouter()


  useEffect(() => {
    getBookById(params?.id);
  }, []);

  const getBookById = async (bookId: any) => {
    try {
      const getBooksApiData = await HandleGetBookById(bookId);
      setLoading(false);
      setRows(getBooksApiData.data);
    } catch {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <Box className={styles.main}>
        <Box className={styles.siteBodyContainer}>
          <Card style={{ height: "70vh" }}>
            <CardContent style={{ textAlign: "center" }}>
              <Box sx={{ position: "relative" }}>
                <Button sx={{ position: "absolute", top: 0, right: 0, }} onClick={()=> router.push('/profile')}>
                  Back to Home
                </Button>
              </Box>

              <Typography variant="h4">Title: {capitalizeFirstLetter(rows.title)}</Typography>
              <Typography variant="h6">Author: {rows.author}</Typography>
              <Typography variant="h6">Category: {rows.category}</Typography>
              <Typography variant="h6">
                Description: {rows.description}
              </Typography>
              <Typography variant="h6">Price: ${rows.price}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default BookById;
