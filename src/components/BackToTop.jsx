import { Button, ThemeProvider } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import {MdExpandLess} from 'react-icons/md'
import { colorTheme, fontTheme } from "./helpers/Theme";

export default function BackToTop({ showBelow }) {
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });
  return (
    <ThemeProvider theme={(fontTheme, colorTheme)}>
      {show && (
        <Button
          variant="contained"
          onClick={handleClick}
          color= "mainColor"
          style={{
            zIndex: "2",
            position: "fixed",
            bottom: "2vh",
            right: "2vh",
            borderRadius: '100%',
            minWidth: "55px",
            height: "55px"
          }}
        >
          <MdExpandLess style={{fontSize: '20px'}}/>
        </Button>
      )}
    </ThemeProvider>
  );
}
