import { Box, Button, Paper, ThemeProvider } from "@mui/material";
import React from "react";
import { colorTheme, fontTheme } from "./helpers/Theme";

export function ConfirmDelete({ handleDeleteTask, setDeletingTask }) {
  return (
    <ThemeProvider theme={(fontTheme, colorTheme)}>
      <Box
        component={Paper}
        style={{
          left: "50%",
          marginLeft: "-150px",
          top: "50%",
          marginTop: "-60px",
          backgroundColor: "#104C91",
          color: "white",
          fontWeight: '600'
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
          <Button
            variant="contained"
            onClick={handleDeleteTask}
            style={{fontFamily: 'Poppins'}}
            color='helperColor'
          >
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={() => setDeletingTask(false)}
            style={{fontFamily: 'Poppins'}}
            color='helperColor'
          >
            No
          </Button>
        </div>
      </Box>
    </ThemeProvider>
  );
}
