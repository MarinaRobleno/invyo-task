import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { AuthContext } from "../helpers/Context";
import { useNavigate } from "react-router-dom";

export function LogIn() {
  const mailKey = "test@invyo.io";
  const passwordKey = "test123@";
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleMailInput = (e) => {
    setMail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (mailKey === mail && passwordKey === password) {
      setLoggedIn(true);
    } else {
      setError(true);
      alert("Incorrect mail or password");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/todo", { replace: true });
    }
  }, [loggedIn]);

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <TextField
          className="login-field"
          id="filled-basic"
          error={error}
          label="Email"
          variant="filled"
          value={mail}
          onChange={handleMailInput}
        />
        <TextField
          className="login-field"
          id="filled-basic"
          error={error}
          type="password"
          label="Password"
          variant="filled"
          value={password}
          onChange={handlePasswordInput}
        />
        <Button
          style={{ fontWeight: "bold" }}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
      <div>test@invyo.io test123@</div>
    </div>
  );
}
