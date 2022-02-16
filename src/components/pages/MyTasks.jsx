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
import { fontTheme } from "../helpers/Theme";

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
            theme={fontTheme}
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
            theme={fontTheme}
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
              <TableCell
                align="left"
                style={{ fontWeight: "bold" }}
                theme={fontTheme}
              >
                Title
              </TableCell>
              <TableCell
                align="left"
                style={{ fontWeight: "bold" }}
                theme={fontTheme}
              >
                Description
              </TableCell>
              <TableCell
                align="left"
                style={{ fontWeight: "bold" }}
                theme={fontTheme}
              >
                Deadline
              </TableCell>
              <TableCell
                align="left"
                style={{ fontWeight: "bold" }}
                theme={fontTheme}
              >
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
                if (showCompleted === true) {
                  return task;
                } else if (showCompleted === false) {
                  return task.deadline > today;
                }
              })
              .map((task) => (
                <TableRow key={tasksList.indexOf(task)} theme={fontTheme}>
                  <TableCell component="th" scope="row" theme={fontTheme}>
                    {task.title}
                  </TableCell>
                  <TableCell component="th" scope="row" theme={fontTheme}>
                    {task.description}
                  </TableCell>
                  <TableCell component="th" scope="row" theme={fontTheme}>
                    {task.deadline}
                  </TableCell>
                  <TableCell component="th" scope="row" theme={fontTheme}>
                    {task.deadline >= today ? "in progress" : "completed"}
                  </TableCell>
                  <TableCell component="th" scope="row" theme={fontTheme}>
                    <Button
                      theme={fontTheme}
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
                      theme={fontTheme}
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
