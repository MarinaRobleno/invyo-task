import React from "react";
import { Button, TextField } from "@mui/material";

export function LogIn() {
  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form className="login-form">
        <TextField className="login-field" id="filled-basic" label="Email" variant="filled" />
        <TextField className="login-field" id="filled-basic" label="Password" variant="filled" />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}
