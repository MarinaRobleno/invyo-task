import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import data from "../../data/data";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

export function MyData() {
  const articles = data.articles;
  const [topicArray, setTopicArray] = useState([]);
  const [uniqueTopicArray, setUniqueTopicArray] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [language, setLanguage] = useState("");
  const [tag, setTag] = useState([]);
  const [articlesCount, setArticlesCount] = useState(articles.length);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  console.log(tag);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    document.getElementById("search-bar").value = "";
    setSearch("");
  };

  const handleOrderAlphabetically = (e) => {
    setOrder(e.target.value);
  };

  const handleLanguageFilter = (e) => {
    setLanguage(e.target.value);
  };

  const handleTagFilter = (e) => {
    if (e.target.value === "none") {
      setTag("");
    } else {
      const {
        target: { value },
      } = e;
      setTag(typeof value === "string" ? value.split(",") : value);
    }
  };

  const handleShowMore = (e) => {
    const currentContent = document.getElementById(e.target.id);
    if (currentContent.classList.contains("hide-content")) {
      currentContent.classList.remove("hide-content");
      e.target.textContent = "Hide";
    } else {
      currentContent.classList.add("hide-content");
      e.target.textContent = "Show More";
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    for (let i = 0; i < articles.length; i++) {
      articles[i].Tags.topic.map((tag) => {
        topicArray.push(tag);
      });
    }
    setUniqueTopicArray([...new Set(topicArray)].sort());
  }, []);

  return (
    <>
      <Box
        component={Paper}
        sx={{
          minWidth: 650,
          height: 200,
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", width: "100%" }} id="search-div">
          <TextField
            style={{ width: "100%", marginBottom: "20px" }}
            id="search-bar"
            label="Search Title or Content"
            variant="outlined"
            onChange={handleSearch}
          />
          <Button
            style={{
              fontWeight: "bold",
              maxWidth: "55px",
              height: "55px",
              marginLeft: "10px",
            }}
            variant="outlined"
            onClick={handleClearSearch}
          >
            <AiOutlineClose style={{ fontSize: "20px" }} />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
          id="filter-div"
        >
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="order-alphabetically">
              Order Alphabetically
            </InputLabel>
            <Select
              labelId="order-alphabetically"
              id="demo-simple-select-standard"
              value={order}
              onChange={handleOrderAlphabetically}
              label="Order Alphabetically"
            >
              <MenuItem value={"title"}>Title</MenuItem>
              <MenuItem value={"content"}>Content</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%", marginLeft: "10px" }}>
            <InputLabel id="language-filter">Select Language Filter</InputLabel>
            <Select
              labelId="language-filter"
              id="demo-simple-select-standard"
              value={language}
              onChange={handleLanguageFilter}
              label="Language Filter"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"es"}>Spanish</MenuItem>
              <MenuItem value={"it"}>Italian</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%", marginLeft: "10px" }}>
            <InputLabel id="tag-filter">Select Tag Filter</InputLabel>
            <Select
              labelId="tag-filter"
              id="demo-simple-select-standard"
              multiple
              value={tag}
              onChange={handleTagFilter}
              label="Tag Filter"
            >
              {uniqueTopicArray.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Link to="./network">
            <Button
              id="network-button"
              variant="contained"
              style={{
                marginLeft: "10px",
                width: "100px",
                height: "55px",
                fontWeight: "bold",
              }}
            >
              Network
            </Button>
          </Link>
        </div>
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
            {articles
              .sort(function (a, b) {
                if (order === "title") {
                  if (a.Title > b.Title) {
                    return 1;
                  } else if (a.Title < b.Title) {
                    return -1;
                  }
                  return 0;
                } else if (order === "content") {
                  if (a.Content > b.Content) {
                    return 1;
                  } else if (a.Content < b.Content) {
                    return -1;
                  }
                  return 0;
                }
              })
              .filter((article) => {
                if (language === "") {
                  return article;
                } else if (article.Language === language) {
                  return article;
                }
              })
              .filter((article) => {
                if (tag.length === 0) {
                  return article;
                } else if (
                  tag.some((element) => article.Tags.topic.includes(element))
                ) {
                  return article;
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
                    id={articles.indexOf(article)}
                    align="left"
                    className="hide-content"
                    style={{
                      maxWidth: "800px",
                    }}
                  >
                    {article.Content}{" "}
                    <div
                      id={articles.indexOf(article)}
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={handleShowMore}
                    >
                      Show more
                    </div>
                  </TableCell>
                  <TableCell align="left">{article.Language}</TableCell>
                  <TableCell align="left">
                    {article.Tags.topic.map((tag) => (
                      <Chip label={tag} />
                    ))}
                  </TableCell>
                </TableRow>
              ))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={articlesCount}
                rowsPerPageOptions={[5, 10, 25, 100, articlesCount]}
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
