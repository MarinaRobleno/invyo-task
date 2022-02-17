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
  ThemeProvider,
} from "@mui/material";
import { MdOutlineAddCircle } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { NewTask } from "../NewTask";
import { AiFillCloseCircle } from "react-icons/ai";
import { ConfirmDelete } from "../ConfirmDelete";
import { EditTask } from "../EditTask";
import { fontTheme, colorTheme } from "../helpers/Theme";
import { deleteError, deleteSuccess } from "../helpers/Toasts";
import { MyTasksRow } from "../MyTasksRow";

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
  const [showCompleted, setShowCompleted] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const handleOpenAddForm = () => {
    if (addForm) {
      setAddForm(false);
    } else {
      setAddForm(true);
    }
  };

  const handleShowAll = () => {
    if (showCompleted) {
      setShowCompleted(false);
    } else {
      setShowCompleted(true);
    }
  };

  const handleDeleteTask = () => {
    try {
      setTasksList(tasksList.filter((task) => task.id !== deletingTask));
      setDeletingTask(false);
      deleteSuccess();
    } catch (err) {
      deleteError();
    }
  };

  useEffect(() => {
    saveState(tasksList);
  }, [tasksList]);

  return (
    <div style={{ display: "flex" }}>
      <ThemeProvider theme={(fontTheme, colorTheme)}>
        <TableContainer
          component={Paper}
          style={{ width: "100%", height: "100%" }}
          sx={{
            minWidth: 650,
            margin: "70px 0 20px",
            backgroundColor: "#104C91",
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
                margin: "20px",
                width: "150px",
                height: "40px",
                fontWeight: "bold",
                fontFamily: "Poppins",
                fontSize: "12px",
              }}
              color="mainColor"
              onClick={handleShowAll}
            >
              {showCompleted ? "Hide Completed" : "Show Completed"}
            </Button>
            <Button
              variant="contained"
              style={{
                margin: "20px",
                minWidth: "10px",
                height: "52px",
                fontWeight: "bold",
                borderRadius: "100%",
              }}
              color="mainColor"
              onClick={handleOpenAddForm}
            >
              {addForm ? (
                <AiFillCloseCircle style={{ fontSize: "20px" }} />
              ) : (
                <MdOutlineAddCircle style={{ fontSize: "20px" }} />
              )}
            </Button>
          </div>

          <Table
            sx={{ minWidth: 650, padding: "20px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                >
                  Deadline
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", width: "20px" }}
                ></TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", width: "20px" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#EFC9AF" }}>
              {tasksList
                .filter((task) => {
                  if (showCompleted === true) {
                    return task;
                  } else if (showCompleted === false) {
                    return task.deadline > today;
                  }
                })
                .sort(function (a, b) {
                  if (a.deadline > b.deadline) {
                    return 1;
                  }
                  if (a.deadline < b.deadline) {
                    return -1;
                  }
                  return 0;
                })
                .map((task) => (
                  <MyTasksRow tasksList={tasksList} task={task} today={today} setDeletingTask={setDeletingTask} setEditingTask={setEditingTask}/>
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
              margin: "70px 0 20px",
              padding: "20px",
              marginLeft: "20px",
              position: "relative",
              backgroundColor: "#104C91",
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
      </ThemeProvider>
    </div>
  );
}
