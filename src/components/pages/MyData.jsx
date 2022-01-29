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
  Chip,
  Box,
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import data from "../../data/data";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { AccountCircle } from "@mui/icons-material";

export function MyData() {
  const articles = data.articles;
  const tagTypes = Object.keys(articles[0].Tags);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("Order Alphabetically");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    document.getElementById("search-bar").value = "";
    setSearch("");
  };

  const handleOrderAlphabetically = (e) => {
    setOrder(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{
          minWidth: 650,
          height: 300,
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", width: "100%" }} id="search-div">
          <TextField
            style={{ width: "100%", marginBottom: '20px' }}
            id="search-bar"
            label="Search Title or Content"
            variant="outlined"
            onChange={handleSearch}
          />
          <Button
            style={{ fontWeight: "bold", maxWidth: "55px", height: "55px" }}
            variant="outlined"
            onClick={handleClearSearch}
          >
            <AiOutlineClose />
          </Button>
        </div>
        <FormControl style={{ width: '200px'}}>
          <InputLabel id="demo-simple-select-label">
            Order Alphabetically
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={order}
            onChange={handleOrderAlphabetically}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'title'}>Title</MenuItem>
            <MenuItem value={'content'}>Content</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
            {(rowsPerPage > 0
              ? articles.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : articles
            )
              .sort(function(a,b) {
                if (order === "title"){
                  if (a.Title > b.Title) {
                    return 1
                  } else if(a.Title < b.Title){
                    return -1
                  }
                  return 0;
                }else if(order === "content"){
                  if (a.Content > b.Content) {
                    return 1
                  } else if(a.Content < b.Content){
                    return -1
                  }
                  return 0;
                }else{
                  return 0;
                }
              })
              .filter((article) => {
                if (search === "") {
                  return article;
                } else if (
                  String(article.Title)
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  String(article.Content)
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return article;
                }
              })
              .map((article) => (
                <TableRow key={articles.indexOf(article)}>
                  <TableCell component="th" scope="row">
                    {article.Title}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      maxWidth: "800px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {article.Content}
                  </TableCell>
                  <TableCell align="left">{article.Language}</TableCell>
                  <TableCell align="left">
                    {tagTypes.map((tagType) =>
                      article.Tags[tagType].map((tag) => <Chip label={tag} />)
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={articles.length}
                rowsPerPageOptions={[5, 10, 25, 100, articles.length]}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
