import React from "react";
import { Button } from "@mui/material/";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { fontTheme } from "./helpers/Theme";

export function NavBar({ setLoggedIn }) {
  return (
    <header>
      <div className="button-line">
        <Link to="/data">
          <Button
            theme={fontTheme}
            style={{ fontWeight: "bold" }}
            className="nav-button"
            variant="contained"
          >
            Data
          </Button>
        </Link>
        <Link to="/todo">
          <Button
            theme={fontTheme}
            style={{ fontWeight: "bold" }}
            className="nav-button"
            variant="contained"
          >
            My Tasks
          </Button>
        </Link>
      </div>
      <Button
        theme={fontTheme}
        style={{ minWidth: "30px" }}
        className="logout-button"
        variant="contained"
        onClick={() => setLoggedIn(false)}
      >
        <AiOutlineLogout className="logout-icon" />
      </Button>
    </header>
  );
}
