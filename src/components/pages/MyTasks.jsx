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
  Chip,
  Box,
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { MdOutlineAddCircle } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { NewTask } from "../NewTask";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ConfirmDelete } from "../ConfirmDelete";

export function MyTasks() {
  const saveState = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const retrieveState = () => {
    return localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
  };
  const [tasksList, setTasksList] = useState(retrieveState());
  const [showCompleted, setShowCompleted] = useState("");
  const [addForm, setAddForm] = useState("");
  const [deletingTask, setDeletingTask] = useState("");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const handleOpenAddForm = () => {
    if (addForm) {
      setAddForm("");
    } else {
      setAddForm("show");
    }
  };

  const handleShowAll = () => {
    if (showCompleted) {
      setShowCompleted("");
    } else {
      setShowCompleted("all");
    }
  };

  const handleDeleteTask = () => {
    setTasksList(tasksList.filter((task) => task.title !== deletingTask));
    setDeletingTask("");
  };

  useEffect(() => {
    saveState(tasksList);
  }, [tasksList]);

  return (
    <div style={{ display: "flex" }}>
      {addForm ? (
        <Box
          component={Paper}
          sx={{
            minWidth: 300,
            height: 300,
            marginBottom: "20px",
            padding: "20px",
            marginRight: "20px",
          }}
        >
          <NewTask setTasksList={setTasksList} />
        </Box>
      ) : null}
      <TableContainer
        component={Paper}
        style={{ width: "100%", height: "100%" }}
        sx={{
          minWidth: 650,
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <Button
          variant="contained"
          style={{
            marginLeft: "10px",
            width: "55px",
            height: "55px",
            fontWeight: "bold",
          }}
          onClick={handleOpenAddForm}
        >
          <MdOutlineAddCircle style={{ fontSize: "30px" }} />
        </Button>
        <Button
          variant="contained"
          style={{
            marginLeft: "10px",
            width: "100px",
            height: "55px",
            fontWeight: "bold",
          }}
          onClick={handleShowAll}
        >
          Completed Tasks
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Deadline
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell
                align="left"
                style={{ fontWeight: "bold" }}
              ></TableCell>
              <TableCell
                align="left"
                style={{ fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasksList
              .filter((task) => {
                if (showCompleted === "all") {
                  return task;
                } else if (showCompleted === "") {
                  return task.deadline > today;
                }
              })
              .map((task) => (
                <TableRow key={tasksList.indexOf(task)}>
                  <TableCell component="th" scope="row">
                    {task.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {task.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {task.deadline}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {task.deadline >= today ? "in progress" : "completed"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button id={task.title} style={{ cursor: "pointer" }}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      id={task.title}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setDeletingTask(e.target.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deletingTask ? (
        <ConfirmDelete
          handleDeleteTask={handleDeleteTask}
          setDeletingTask={setDeletingTask}
        />
      ) : null}
    </div>
  );
}
