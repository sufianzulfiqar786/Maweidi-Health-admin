import React, { useState } from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CartCounter from "./CartCounter";

const CartDetailTable = ({ rows, xraycarttable, testIcon }) => {
  const [count, setCount] = useState(1);

  const handleCountChange = (newCount) => {
    setCount(newCount);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "#FFFFFF" }}
      className="custom-scroll"
    >
      <Table aria-label="simple table">
        <TableHead
          sx={{
            "& th": {
              color: "#193F52",
              whiteSpace: "nowrap",
              wordWrap: "break-word",
            },
          }}
        >
          <TableRow>
            <TableCell className="number" align="left"></TableCell>
            {xraycarttable ? (
              <TableCell align="left">Product</TableCell>
            ) : (
              <TableCell align="left">Test</TableCell>
            )}

            <TableCell align="center">Lab Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Price</TableCell>
            {/* <TableCell align="center">Qty</TableCell> */}
            {/* <TableCell align="center">Total</TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            "& td": {
              color: "#767676",
              whiteSpace: "nowrap",
              wordWrap: "break-word",
            },
          }}
        >
          {rows?.map((row, index) => {
            console.log(row);
            return (<>
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="number">
                  {row.number}
                </TableCell>
                <TableCell align="left">
                  <CardHeader
                    sx={{ padding: "10px  0px" }}
                    avatar={
                      <Box
                        sx={{
                          margin: 0,
                          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
                        }}
                      >
                        <Avatar
                          src={testIcon}
                          sx={{ borderRadius: 0, width: "39px", height: "39px" }}
                        />
                      </Box>
                    }
                    title={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          flexDirection: "column", // Change flexDirection to "column"
                          margin: 0,
                          gap: "6px",
                        }}
                      >
                        <Box
                          sx={{
                            color: "#193F52",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          {row.name}
                        </Box>

                        {!xraycarttable ? (
                          <Box sx={{ color: "#202020", fontSize: "12px" }}>
                            {row.test}
                          </Box>
                        ) : null}
                      </Box>
                    }
                  />
                </TableCell>

                <TableCell align="center">{row.LabName}</TableCell>
                <TableCell align="center">{row.Address}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">KWD 255.00</TableCell>

                {/* <TableCell align="center">
                <CartCounter onChange={handleCountChange} />
              </TableCell> */}

                {/* <TableCell align="center">KWD 255.00</TableCell> */}
              </TableRow>
            </>)
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartDetailTable;
