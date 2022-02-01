import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function NewTask({ setTasksList }) {
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
      console.log(newTask)
    }
  };

  useEffect(() => {
    setNewTask({...newTask, id: uuidv4()})
  }, [newTask.title])

  return (
    <form
      style={{ display: "flex", flexDirection: "column", justifyContent: 'space-around', height: '100%' }}
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
