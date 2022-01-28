import React from "react";
import { Button } from "@mui/material/";
import { AiOutlineLogout } from "react-icons/ai";

export function NavBar({setLoggedIn}) {
  return (
    <header>
      <div className="button-line">
        <Button className="nav-button" variant="contained">Data</Button>
        <Button className="nav-button" variant="contained">My Tasks</Button>
      </div>
      <Button className="logout-button" variant="contained" onClick={() => setLoggedIn(false)}>
        <AiOutlineLogout/>
      </Button>
    </header>
  );
}
