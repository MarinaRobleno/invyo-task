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
  Modal,
  Switch,
} from "@mui/material";
import { MdPostAdd } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { NewTask } from "../NewTask";
import {
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
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
    const addFormContainer = document.getElementById("add-form-container");
    if (addForm) {
      setAddForm(false);
      addFormContainer.classList.remove("visible");
    } else {
      setAddForm(true);
      addFormContainer.classList.add("visible");
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
    <div className="table-container" style={{ display: "flex" }}>
      <ThemeProvider theme={(fontTheme, colorTheme)}>
        <TableContainer
          className="table-container"
          component={Paper}
          style={{
            width: "100%",
            height: "100%",
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
            <div
              style={{ display: "flex", alignItems: "center", margin: "20px" }}
            >
              <Switch onChange={handleShowAll} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "150px",
                  height: "40px",
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  color: "#EDEDED",
                }}
              >
                {showCompleted ? "Showing Completed" : "Hiding Completed"}
              </div>
            </div>
            <Button
              variant={addForm ? "contained" : "text"}
              style={{
                margin: "20px",
                minWidth: "50px",
                height: "50px",
                fontWeight: "bold",
                padding: "0",
                borderRadius: "100%",
              }}
              color="mainColor"
              onClick={handleOpenAddForm}
            >
              <MdPostAdd style={{ fontSize: "25px" }} />
            </Button>
          </div>

          <Table aria-label="simple table">
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
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                >
                  Progress
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", width: "20px", textAlign: 'center' }}
                >
                  <AiFillEdit style={{fontSize: '18px', color: 'white'}} />
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontWeight: "bold", width: "20px", textAlign: 'center' }}
                >
                  <AiFillDelete style={{fontSize: '18px', color: 'white'}} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#EDEDED" }}>
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
                  <MyTasksRow
                    tasksList={tasksList}
                    task={task}
                    today={today}
                    setDeletingTask={setDeletingTask}
                    setEditingTask={setEditingTask}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          className="add-form-container "
          id="add-form-container"
          component={Paper}
          sx={{
            width: 400,
            height: 300,
            margin: "70px 0 20px",
            padding: "20px",
            marginLeft: "20px",
            position: "relative",
            backgroundColor: "#104C91",
            transition: "width 2s",
          }}
        >
          <NewTask setTasksList={setTasksList} today={today} />
        </Box>
        <Modal
          id="delete-modal-container"
          open={deletingTask != false}
          onClose={() => setDeletingTask(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ConfirmDelete
            handleDeleteTask={handleDeleteTask}
            setDeletingTask={setDeletingTask}
          />
        </Modal>
        {editingTask ? (
          <Modal
            open={editingTask != null}
            onClose={() => setEditingTask(null)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <EditTask
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              setTasksList={setTasksList}
              tasksList={tasksList}
            />
          </Modal>
        ) : null}
      </ThemeProvider>
    </div>
  );
}
