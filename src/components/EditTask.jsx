import React, { useState } from "react";
import { Box, Button, Paper, TextField, ThemeProvider } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { colorTheme, fontTheme } from "./helpers/Theme";
import { editError, editSuccess } from "./helpers/Toasts";

export function EditTask({
  editingTask,
  setEditingTask,
  tasksList,
  setTasksList,
}) {
  const [editedTask, setEditedTask] = useState(editingTask);

  const handleEditTitle = (e) => {
    e.preventDefault();
    setEditedTask({ ...editedTask, title: e.target.value });
  };
  const handleEditDescription = (e) => {
    e.preventDefault();
    setEditedTask({ ...editedTask, description: e.target.value });
  };
  const handleEditDeadline = (e) => {
    e.preventDefault();
    setEditedTask({ ...editedTask, deadline: e.target.value });
  };

  const handleSubmitEditTask = (e) => {
    e.preventDefault();
    if (!editedTask.title || !editedTask.description || !editedTask.deadline) {
      editError();
    } else {
      setTasksList(
        tasksList.map((task) =>
          task.id === editedTask.id
            ? {
                ...task,
                title: editedTask.title,
                description: editedTask.description,
                deadline: editedTask.deadline,
              }
            : task
        )
      );
      setEditingTask("");
      editSuccess();
    }
  };

  return (
    <ThemeProvider theme={fontTheme, colorTheme}>
      <Box
        component={Paper}
        style={{
          left: "50%",
          marginLeft: "-150px",
          top: "50%",
          marginTop: "-150px",
          backgroundColor: "#104C91"
        }}
        sx={{
          position: "absolute",
          minWidth: 300,
          height: 300,
          marginBottom: "20px",
          padding: "20px",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: 'Poppins',
            fontWeight: '600',
            color:'white'
          }}
        >
          Edit Task
          <AiFillCloseCircle
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => setEditingTask("")}
          />
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          onSubmit={handleSubmitEditTask}
        >
          <TextField
            label="Title"
            size="small"
            variant="filled"
            style={{ width: "100%" }}
            defaultValue={editingTask.title}
            onChange={handleEditTitle}
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
            style={{ width: "100%" }}
            defaultValue={editingTask.description}
            onChange={handleEditDescription}
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
            label="Deadline"
            size="small"
            variant="filled"
            style={{ width: "100%" }}
            defaultValue={editingTask.deadline}
            onChange={handleEditDeadline}
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
            color='mainColor'
            type="submit"
            style={{
              width: "120px",
              height: "40px",
              fontWeight: "bold",
              fontFamily: 'Poppins',
              marginBottom: '10px'
            }}
          >
            Confirm
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
}
