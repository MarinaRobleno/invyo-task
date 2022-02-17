import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { AuthContext } from "../helpers/Context";
import { useNavigate } from "react-router-dom";
import { fontTheme, colorTheme } from "../helpers/Theme";
import { loginError, loginSuccess } from "../helpers/Toasts";

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
      loginSuccess();
    } else {
      setError(true);
      loginError();
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
        <h1 style={{ fontFamily: "Poppins", marginBottom: "30px" }}>Log In</h1>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <TextField
            InputProps={{
              style: {
                fontFamily: "Poppins",
                color: "#104C91",
                backgroundColor: "#EFC9AF",
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "#104C91" },
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
                color: "#104C91",
                backgroundColor: "#EFC9AF",
              },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins", color: "#104C91" },
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
            style={{ fontWeight: "bold", fontFamily: 'Poppins', width: '50%', margin: '0 auto' }}
            type="submit"
            variant="contained"
            color="helperColor"
          >
            Submit
          </Button>
        </form>
        <div>user: test@invyo.io// password: test123@</div>
      </ThemeProvider>
    </div>
  );
}
