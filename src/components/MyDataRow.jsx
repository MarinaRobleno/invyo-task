import React from "react";
import { TableRow, TableCell, Chip } from "@mui/material";

export function MyDataRow({ articles, article, setTag, handleShowMore }) {
  return (
    <TableRow key={articles.indexOf(article)} style={{height: '130px'}}>
      <TableCell
        component="th"
        scope="row"
        style={{ color: "#104C91", fontFamily: "Poppins", width: "350px" }}
      >
        {article.Title}
      </TableCell>
      <TableCell
        id={articles.indexOf(article)}
        align="left"
        className="hide-content"
        style={{
          maxWidth: "650px",
          color: "#104C91",
          fontFamily: "Poppins",
        }}
      >
        {article.Content}{" "}
        <div
          id={articles.indexOf(article)}
          style={{
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "underline",
            color: "#104C91",
            fontFamily: "Poppins",
          }}
          onClick={handleShowMore}
        >
          Show more
        </div>
      </TableCell>
      <TableCell
        align="left"
        style={{ color: "#104C91", fontFamily: "Poppins" }}
      >
        {article.Language}
      </TableCell>
      <TableCell
        align="left"
        style={{ color: "#104C91", fontFamily: "Poppins" }}
      >
        {article.Tags.topic.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            style={{
              color: "#EFC9AF",
              backgroundColor: "#104C91",
              fontFamily: "Poppins",
              cursor: "pointer",
            }}
            onClick={() => setTag((prev) => [...prev, tag])}
          />
        ))}
      </TableCell>
    </TableRow>
  );
}
