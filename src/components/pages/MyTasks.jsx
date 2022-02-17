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
    setTasksList(tasksList.filter((task) => task.id !== deletingTask));
    setDeletingTask(false);
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
            padding: "20px",
            backgroundColor: "#104C91"
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
                marginLeft: "10px",
                minWidth: '10px',
                height: '52px',
                fontWeight: "bold",
                borderRadius: '100%'
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

          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", color: 'white', fontFamily: 'Poppins' }}
                >
                  Title
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", color: 'white', fontFamily: 'Poppins' }}
                >
                  Description
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", color: 'white', fontFamily: 'Poppins' }}
                >
                  Deadline
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", color: 'white', fontFamily: 'Poppins' }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", width: '20px' }}
                ></TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", width: '20px' }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                  <TableRow key={tasksList.indexOf(task)}>
                    <TableCell component="th" scope="row" style={{color: 'white', fontFamily: 'Poppins'}}>
                      {task.title}
                    </TableCell>
                    <TableCell component="th" scope="row" style={{color: 'white', fontFamily: 'Poppins', maxWidth: '300px'}}>
                      {task.description}
                    </TableCell>
                    <TableCell component="th" scope="row" style={{color: 'white', fontFamily: 'Poppins'}}>
                      {task.deadline}
                    </TableCell>
                    <TableCell component="th" scope="row" style={{color: 'white', fontFamily: 'Poppins'}}>
                      {task.deadline >= today ? "in progress" : "completed"}
                    </TableCell>
                    <TableCell component="th" scope="row" >
                      <Button
                        color='mainColor'
                        variant="contained"
                        id={task.id}
                        style={{ cursor: "pointer", fontFamily: 'Poppins' }}
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
                        color='mainColor'
                        variant="contained"
                        id={task.id}
                        style={{ cursor: "pointer", fontFamily: 'Poppins' }}
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
              margin: "70px 0 20px",
              padding: "20px",
              marginLeft: "20px",
              position: "relative",
              backgroundColor: '#104C91'
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
