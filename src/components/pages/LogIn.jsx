import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { AuthContext } from "../helpers/Context";
import { useNavigate } from "react-router-dom";
import { fontTheme, colorTheme } from "../helpers/Theme";

export function LogIn() {
  const mailKey = "test@invyo.io";
  const passwordKey = "test123@";
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mail, setMail] = useState(null);
  const [password, setPassword] = useState(null);
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
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/todo", { replace: true });
    }
  }, [loggedIn]);

  return (
    <div className="login-container">
      <ThemeProvider theme={fontTheme, colorTheme}>
        <h2 style={{ fontFamily: "Poppins", marginBottom: "50px" }}>Log In</h2>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <TextField
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "white",
                backgroundColor: "#1F8AC0",
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "white" },
            }}
            color="mainColor"
            className="login-field"
            id="filled-basic"
            error={error}
            label="Email"
            variant="filled"
            value={mail}
            onChange={handleMailInput}
          />
          <TextField
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "white",
                backgroundColor: "#1F8AC0",
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "white" },
            }}
            color="mainColor"
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
            style={{ fontWeight: "bold", fontFamily: 'Poppins' }}
            type="submit"
            variant="contained"
            color="mainColor"
          >
            Submit
          </Button>
        </form>
        <div>user: test@invyo.io// password: test123@</div>
      </ThemeProvider>
    </div>
  );
}
