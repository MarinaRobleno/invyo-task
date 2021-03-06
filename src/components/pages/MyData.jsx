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
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ThemeProvider,
} from "@mui/material";
import data from "../../data/data";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { fontTheme, colorTheme } from "../helpers/Theme";
import { MyDataRow } from "../MyDataRow";
import BackToTop from "../BackToTop";

export function MyData() {
  const articles = data.articles;
  const [languageArray, setLanguageArray] = useState([]);
  const [topicArray, setTopicArray] = useState([]);
  const [uniqueLanguageArray, setUniqueLanguageArray] = useState([]);
  const [uniqueTopicArray, setUniqueTopicArray] = useState([]);
  const [search, setSearch] = useState(null);
  const [order, setOrder] = useState("");
  const [language, setLanguage] = useState("");
  const [tag, setTag] = useState([]);
  const [articlesCount, setArticlesCount] = useState(articles.length);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    document.getElementById("search-bar").value = null;
    setSearch(null);
  };

  const handleOrderAlphabetically = (e) => {
    setOrder(e.target.value);
  };

  const handleLanguageFilter = (e) => {
    setLanguage(e.target.value);
  };

  const handleTagFilter = (e) => {
    if (e.target.value === "none") {
      setTag([]);
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
      languageArray.push(articles[i].Language);
    }
    setUniqueTopicArray([...new Set(topicArray)].sort());
    setUniqueLanguageArray([...new Set(languageArray)].sort());
  }, []);

  useEffect(() => {
    setPage(0);
  }, [search, order, language, tag]);

  return (
    <div className="table-container">
      <ThemeProvider theme={(fontTheme, colorTheme)}>
        <Box
          component={Paper}
          style={{
            backgroundColor: "#104C91",
          }}
          sx={{
            minWidth: 650,
            height: 200,
            margin: "70px 0 20px",
            padding: "20px",
          }}
        >
          <div
            style={{ display: "flex", width: "100%", position: "relative" }}
            id="search-div"
          >
            <TextField
              style={{ width: "100%", marginBottom: "20px" }}
              id="search-bar"
              label="Search Title or Content"
              variant="filled"
              onChange={handleSearch}
              color="secondaryColor"
              InputProps={{
                style: {
                  fontFamily: "Poppins",
                  color: "#104C91",
                  backgroundColor: "#EDEDED",
                },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins", color: "#104C91" },
              }}
            />
            <Button
              style={{
                position: "absolute",
                height: "56px",
                right: "0",
                top: "0px",
              }}
              onClick={handleClearSearch}
              color="secondaryColor"
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
            <FormControl variant="filled" style={{ width: "100%" }}>
              <InputLabel style={{ color: "#104C91", fontFamily: "Poppins" }}>
                Order Alphabetically
              </InputLabel>
              <Select
                labelId="order-alphabetically"
                id="demo-simple-select-standard"
                value={order}
                onChange={handleOrderAlphabetically}
                label="Order Alphabetically"
                id="order-alphabetically"
                color="secondaryColor"
                style={{
                  backgroundColor: "#EDEDED",
                  color: "#104C91",
                  fontFamily: "Poppins",
                }}
              >
                <MenuItem
                  value={"title"}
                  style={{ color: "#104C91", fontFamily: "Poppins" }}
                >
                  Title
                </MenuItem>
                <MenuItem
                  value={"content"}
                  style={{ color: "#104C91", fontFamily: "Poppins" }}
                >
                  Content
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              style={{ width: "100%", marginLeft: "10px" }}
            >
              <InputLabel
                id="language-filter"
                style={{ color: "#104C91", fontFamily: "Poppins" }}
              >
                Select Language Filter
              </InputLabel>
              <Select
                labelId="language-filter"
                id="demo-simple-select-standard"
                value={language}
                onChange={handleLanguageFilter}
                label="Language Filter"
                color="secondaryColor"
                style={{
                  backgroundColor: "#EDEDED",
                  color: "#104C91",
                  fontFamily: "Poppins",
                }}
              >
                <MenuItem
                  value=""
                  style={{ color: "#104C91", fontFamily: "Poppins" }}
                >
                  <em>None</em>
                </MenuItem>
                {uniqueLanguageArray.map((language) => (
                  <MenuItem
                    key={language}
                    value={language}
                    style={{ color: "#104C91", fontFamily: "Poppins" }}
                  >
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              style={{ width: "100%", marginLeft: "10px" }}
            >
              <InputLabel
                id="tag-filter"
                style={{ color: "#104C91", fontFamily: "Poppins" }}
              >
                Select Tag Filter
              </InputLabel>
              <Select
                labelId="tag-filter"
                id="demo-simple-select-standard"
                multiple
                value={tag}
                onChange={handleTagFilter}
                label="Tag Filter"
                color="secondaryColor"
                style={{
                  backgroundColor: "#EDEDED",
                  color: "#104C91",
                  fontFamily: "Poppins",
                }}
              >
                {uniqueTopicArray.map((topic) => (
                  <MenuItem
                    key={topic}
                    value={topic}
                    style={{ color: "#104C91", fontFamily: "Poppins" }}
                  >
                    {topic}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
        <BackToTop
          showBelow={250}
          
        />
        <TableContainer
          component={Paper}
          style={{ backgroundColor: "#EDEDED" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#104C91" }}>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                    color: "white",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                    color: "white",
                  }}
                >
                  Content
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                    color: "white",
                  }}
                >
                  Language
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                    color: "white",
                  }}
                >
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
                  if (search === null) {
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
                  <MyDataRow
                    article={article}
                    articles={articles}
                    setTag={setTag}
                    handleShowMore={handleShowMore}
                  />
                ))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            </TableBody>
            <TableFooter style={{ backgroundColor: "#104C91" }}>
              <TableRow>
                <TablePagination
                  count={articlesCount}
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    100,
                    { value: -1, label: "All" },
                  ]}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  style={{
                    color: "white",
                    fontFamily: "Poppins",
                    border: "none",
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
}
