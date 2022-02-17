import React from "react";
import { Button, ThemeProvider } from "@mui/material/";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { fontTheme, colorTheme } from "./helpers/Theme";

export function NavBar({ setLoggedIn }) {
  let location = useLocation();
  let path = location.pathname;
  return (
    <header>
      <ThemeProvider theme={fontTheme, colorTheme}>
        <div className="button-line">
          <Link to="/data">
            <Button
              style={{ fontWeight: "bold", fontFamily: 'Poppins', height: '40px' }}
              className="nav-button"
              variant={path == '/data' ? "contained" : "outlined"}
              color="mainColor"
            >
              Data
            </Button>
          </Link>
          <Link to="/todo">
            <Button
              style={{ fontWeight: "bold", fontFamily: 'Poppins', height: '40px' }}
              className="nav-button"
              variant={path == '/todo' ? "contained" : "outlined"}
              color="mainColor"
            >
              My Tasks
            </Button>
          </Link>
        </div>
        <Button
          style={{ minWidth: "30px", fontFamily: 'Poppins', color: 'helperColor', borderRadius: '100%' }}
          className="logout-button"
          variant="contained"
          color="mainColor"
          onClick={() => setLoggedIn(false)}
        >
          <AiOutlineLogout className="logout-icon" />
        </Button>
      </ThemeProvider>
    </header>
  );
}
