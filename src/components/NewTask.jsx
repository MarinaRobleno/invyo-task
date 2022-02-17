import { Alert, Button, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { colorTheme, fontTheme } from "./helpers/Theme";

export function NewTask({ setTasksList }) {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
    deadline: "",
  });

  const handleNewTitle = (e) => {
    e.preventDefault();
    setNewTask({ ...newTask, title: e.target.value });
  };
  const handleNewDescription = (e) => {
    e.preventDefault();
    setNewTask({ ...newTask, description: e.target.value });
  };
  const handleNewDeadline = (e) => {
    e.preventDefault();
    setNewTask({ ...newTask, deadline: e.target.value });
  };

  const handleSubmitNewTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.deadline) {
      alert("Please complete the fields");
    } else {
      setTasksList((prev) => [...prev, newTask]);
      setOpen(true);
      const newTaskForm = document.getElementById("new-task-form");
      newTaskForm.reset();
      setNewTask({});
    }
  };

  useEffect(() => {
    setNewTask({ ...newTask, id: uuidv4() });
  }, [newTask.title]);

  return (
    <>
      <ThemeProvider theme={(fontTheme, colorTheme)}>
        {open ? (
          <Alert
            style={{
              position: "absolute",
              top: "305px",
              left: "0",
              width: "100%",
            }}
            onClose={() => {
              setOpen(false);
            }}
            severity="success"
          >
            Task added succesfully!
          </Alert>
        ) : null}
        <form
          id="new-task-form"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
          }}
          onSubmit={handleSubmitNewTask}
        >
          <TextField
            label="Title"
            size="small"
            onChange={handleNewTitle}
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "white",
                backgroundColor: "#1F8AC0",
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "white" },
            }}
          />
          <TextField
            label="Description"
            size="small"
            onChange={handleNewDescription}
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "white",
                backgroundColor: "#1F8AC0",
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "white" },
            }}
          />
          <TextField
            type="date"
            size="small"
            onChange={handleNewDeadline}
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "white",
                backgroundColor: "#1F8AC0",
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "white" },
            }}
          />
          <Button
            variant="contained"
            color="mainColor"
            type="submit"
            style={{
              width: "55px",
              height: "40px",
              fontWeight: "bold",
            }}
          >
            Add
          </Button>
        </form>
      </ThemeProvider>
    </>
  );
}
