"use client"

import Navbar from "@/components/Navbar";
import { Grid } from "@mui/material";
import React from "react";

function Profile() {
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
    </Grid>
  );
}

export default Profile;


// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import Table from '@mui/material/Table';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Badge, Box, Button, TextField, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// // import { addToCart, increment, decrement } from '../../actions/CartAction';
// // import Counter from './incDec';

// // import { useNavigate } from 'react-router-dom';

// export default function Product() {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const addedProduct = useSelector((state) => state.addProduct.product);
//   const counterValues = useSelector((state) => state.counter.counters);

//   // console.log("count",counterValues?.Mobile)

//   function createData(name, quantity, price, total) {
//     return { name, quantity, price, total };
//   }
//   const rows = [
//     createData('Mobile', counterValues?.Mobile, 1000, counterValues?.Mobile ? counterValues?.Mobile*1000 : 1000),
//     createData('Books', counterValues?.Books, 199, counterValues?.Books ? counterValues?.Books*199 : 199),
//     createData('Laptop', counterValues?.Laptop, 1199, counterValues?.Laptop ? counterValues?.Laptop*1199 : 1199),
//     createData('Adapter',counterValues?.Adapter, 10, counterValues?.Adapter ? counterValues?.Adapter*10 : 10),
//     createData('Freeze', counterValues?.Freeze, 1099, counterValues?.Freeze ? counterValues?.Freeze*1099 : 1099),
//   ];

//   const handleAddToCart = (row) => {
//     dispatch(addToCart(row));
//   }

//   // console.log("count", incrementCount)
//   return (
//     <>
//       <Box sx={{ float: 'right', padding: '10px', }}>
//         <Badge color="warning" badgeContent={addedProduct?.length} onClick={() => { navigate('/cart') }} >
//           <ShoppingCartIcon />
//         </Badge>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

//           <TableHead>
//             <TableRow>
//               <TableCell>Product Name</TableCell>
//               <TableCell align="right">Quantity</TableCell>
//               <TableCell align="right">Price&nbsp;($)</TableCell>
//               <TableCell align="right">Total&nbsp;($)</TableCell>
//               <TableCell align="right">Add to cart </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">{row.name}</TableCell>
//                 {/* <TableCell align="right" style={{ textAlign: 'right' }}>
//                   <Button onClick={decrement}> - </Button>
//                   <TextField
                 
//                     id="outlined-read-only-input"
//                     InputProps={{
//                       // readOnly: true,
//                       style: {
//                         width: '50px',
//                       },
//                     }}
//                     value={count}
                    
//                   />

//                   <Button onClick={increment} > + </Button>
//                 </TableCell> */}
//                 <TableCell align="right"><Counter counterId={row.name} price={row.price}/></TableCell>
//                 <TableCell align="right">{row.price}</TableCell>
//                 <TableCell align="right">{row.total}</TableCell>
//                 <TableCell align='right'>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     sx={{ mt: 2 }}
//                     onClick={() => handleAddToCart(row)}>Add to Cart</Button></TableCell>
//               </TableRow>
//             ))}
//           </TableBody>

//         </Table>
//       </TableContainer>
//     </>
//   );
// }




