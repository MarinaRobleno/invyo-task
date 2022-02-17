import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";

export function MyTasksRow({tasksList, task, today, setEditingTask, setDeletingTask}) {
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
        {task.deadline >= today ? "in progress" : "completed"}
      </TableCell>
      <TableCell component="th" scope="row">
        <Button
          color="secondaryColor"
          variant="contained"
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
          variant="contained"
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
