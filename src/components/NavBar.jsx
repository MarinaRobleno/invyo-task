import React from "react";
import { Button } from "@mui/material/";
import { AiOutlineLogout } from "react-icons/ai";

export function NavBar({setLoggedIn}) {
  return (
    <header>
      <div className="button-line">
        <Button style={{fontWeight: 'bold'}} className="nav-button" variant="contained">Data</Button>
        <Button style={{fontWeight: 'bold'}} className="nav-button" variant="contained">My Tasks</Button>
      </div>
      <Button style={{minWidth: '30px'}} className="logout-button" variant="contained" onClick={() => setLoggedIn(false)}>
        <AiOutlineLogout className="logout-icon"/>
      </Button>
    </header>
  );
}
