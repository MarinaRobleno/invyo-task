import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";

export function MyTasksRow({
  tasksList,
  task,
  today,
  setEditingTask,
  setDeletingTask,
}) {
  return (
    <TableRow key={tasksList.indexOf(task)}>
      <TableCell
        component="th"
        scope="row"
        style={{ color: "#104C91", fontFamily: "Poppins" }}
      >
        {task.title}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        style={{
          color: "#104C91",
          fontFamily: "Poppins",
          maxWidth: "300px",
        }}
      >
        {task.description}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        style={{ color: "#104C91", fontFamily: "Poppins" }}
      >
        {task.deadline}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        style={{ color: "#104C91", fontFamily: "Poppins" }}
      >
        {task.deadline > today ? "in progress" : "completed"}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        style={{ color: "#104C91", fontFamily: "Poppins" }}
      >
        <ProgressBar
          completed={
            task.deadline <= today
              ? 100
              : 100 -
                (
                  ((new Date(task.deadline) - new Date(today)) * 100) /
                  (new Date(task.deadline) - new Date(task.dateAdded))
                ).toFixed(0)
          }
          width="70%"
          height="15px"
          bgColor="#104C91"
          labelAlignment="outside"
          labelSize="12px"
          labelColor="#104C91"
        />
      </TableCell>
      <TableCell component="th" scope="row">
        <Button
          color="secondaryColor"
          variant="text"
          id={task.id}
          style={{ cursor: "pointer", fontFamily: "Poppins" }}
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
          color="secondaryColor"
          variant="text"
          id={task.id}
          style={{ cursor: "pointer", fontFamily: "Poppins" }}
          onClick={(e) => setDeletingTask(e.target.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
