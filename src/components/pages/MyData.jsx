import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from "@mui/material";
import data from "../../data/data";

export function MyData() {
  const articles = data.articles;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell align="left" style={{ fontWeight: "bold" }}>
              Content
            </TableCell>
            <TableCell align="left" style={{ fontWeight: "bold" }}>
              Language
            </TableCell>
            <TableCell align="left" style={{ fontWeight: "bold" }}>
              Tags
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : articles).map((article) => (
            <TableRow key={articles.indexOf(article)} sx={{ height: 200 }}>
              <TableCell component="th" scope="row">
                {article.Title}
              </TableCell>
              <TableCell align="left" style={{ whiteSpace: "normal" }}>
                {article.Content}
              </TableCell>
              <TableCell align="left">{article.Language}</TableCell>
              <TableCell align="left">{article.Tags.topic}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={articles.length}
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
