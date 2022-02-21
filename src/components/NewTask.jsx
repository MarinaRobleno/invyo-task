import { Button, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { colorTheme, fontTheme } from "./helpers/Theme";
import { addError, addSuccess } from "./helpers/Toasts";

export function NewTask({ setTasksList, today }) {
  const [error, setError] = useState(false);
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
    deadline: "",
    dateAdded: today
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
      setError(true);
      addError();
    } else {
      setTasksList((prev) => [...prev, newTask]);
      const newTaskForm = document.getElementById("new-task-form");
      newTaskForm.reset();
      setNewTask({});
      addSuccess();
    }
  };

  useEffect(() => {
    setNewTask({ ...newTask, id: uuidv4() });
  }, [newTask.title]);

  return (
    <>
      <ThemeProvider theme={(fontTheme, colorTheme)}>
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
            variant="filled"
            onChange={handleNewTitle}
            error={error}
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "#104C91",
                backgroundColor: "#EDEDED",
                fontSize: '14px'
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "#104C91", fontSize: '14px' },
            }}
          />
          <TextField
            label="Description"
            size="small"
            variant="filled"
            onChange={handleNewDescription}
            error={error}
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "#104C91",
                backgroundColor: "#EDEDED",
                fontSize: '14px'
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "#104C91", fontSize: '14px' },
            }}
          />
          <TextField
            type="date"
            size="small"
            variant="filled"
            onChange={handleNewDeadline}
            error={error}
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "#104C91",
                backgroundColor: "#EDEDED",
                fontSize: '14px'
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "#104C91", fontSize: '14px' },
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
