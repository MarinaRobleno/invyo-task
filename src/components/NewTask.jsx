import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export function NewTask({ setTaskList }) {
  const [newTask, setNewTask] = useState({
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
      setTaskList((prev) => [...prev, newTask]);
    }
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmitNewTask}
    >
      <TextField label="Title" size="small" onChange={handleNewTitle} />
      <TextField
        label="Description"
        size="small"
        onChange={handleNewDescription}
      />
      <TextField
        type="date"
        label="Deadline"
        size="small"
        onChange={handleNewDeadline}
      />
      <Button
        variant="contained"
        type="submit"
        style={{
          width: "55px",
          height: "55px",
          fontWeight: "bold",
        }}
      >
        Add
      </Button>
    </form>
  );
}