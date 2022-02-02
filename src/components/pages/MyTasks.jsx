import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { MdOutlineAddCircle } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { NewTask } from "../NewTask";
import { AiFillCloseCircle } from "react-icons/ai";
import { ConfirmDelete } from "../ConfirmDelete";
import { EditTask } from "../EditTask";

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
  const [editingTask, setEditingTask] = useState("");
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
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
    setTasksList(tasksList.filter((task) => task.id !== deletingTask));
    setDeletingTask("");
  };

  useEffect(() => {
    saveState(tasksList);
  }, [tasksList]);

  return (
    <div style={{ display: "flex" }}>
      <TableContainer
        component={Paper}
        style={{ width: "100%", height: "100%" }}
        sx={{
          minWidth: 650,
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
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
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "10px",
              maxWidth: "230px",
              height: "30px",
              fontWeight: "bold",
            }}
            onClick={handleOpenAddForm}
          >
            {addForm ? (
              <AiFillCloseCircle style={{ fontSize: "20px" }} />
            ) : (
              <MdOutlineAddCircle style={{ fontSize: "20px" }} />
            )}
          </Button>
        </div>

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
                    <Button
                      id={task.id}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setEditingTask({
                          id: task.id,
                          title: task.title,
                          description: task.description,
                          deadline: task.deadline,
                        })
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      id={task.id}
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
      {addForm ? (
        <Box
          component={Paper}
          sx={{
            minWidth: 300,
            height: 300,
            marginBottom: "20px",
            padding: "20px",
            marginLeft: "20px",
            position: "relative",
          }}
        >
          <NewTask setTasksList={setTasksList} />
        </Box>
      ) : null}
      {deletingTask ? (
        <ConfirmDelete
          handleDeleteTask={handleDeleteTask}
          setDeletingTask={setDeletingTask}
        />
      ) : null}
      {editingTask ? (
        <EditTask
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          setTasksList={setTasksList}
          tasksList={tasksList}
        />
      ) : null}
    </div>
  );
}
