import { Box, Button, Paper } from "@mui/material";
import React from "react";

export function ConfirmDelete({ handleDeleteTask, setDeletingTask }) {
  return (
    <Box
      component={Paper}
      style={{
        left: "50%",
        marginLeft: "-150px",
        top: "50%",
        marginTop: "-60px",
      }}
      sx={{
        position: "absolute",
        minWidth: 300,
        height: 120,
        marginBottom: "20px",
        padding: "20px",
        marginRight: "20px",
      }}
    >
      Delete task?
      <div
        style={{
          width: "100%",
          display: " flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <Button variant="contained" onClick={handleDeleteTask}>
          Yes
        </Button>
        <Button variant="contained" onClick={() => setDeletingTask("")}>
          No
        </Button>
      </div>
    </Box>
  );
}
