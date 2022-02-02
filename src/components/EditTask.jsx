import React, { useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";

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
      alert("Please complete the fields");
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
      console.log(tasksList)
    }
  };

  return (
    <Box
      component={Paper}
      style={{
        left: "50%",
        marginLeft: "-150px",
        top: "50%",
        marginTop: "-140px",
      }}
      sx={{
        position: "absolute",
        minWidth: 300,
        height: 280,
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
          style={{ width: "100%" }}
          defaultValue={editingTask.title}
          onChange={handleEditTitle}
        />
        <TextField
          label="Description"
          size="small"
          style={{ width: "100%" }}
          defaultValue={editingTask.description}
          onChange={handleEditDescription}
        />
        <TextField
          type="date"
          size="small"
          style={{ width: "100%" }}
          defaultValue={editingTask.deadline}
          onChange={handleEditDeadline}
        />
        <Button
          variant="contained"
          type="submit"
          style={{
            width: "120px",
            height: "55px",
            fontWeight: "bold",
          }}
        >
          Confirm Changes
        </Button>
      </form>
    </Box>
  );
}