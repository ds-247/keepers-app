import React from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import Face2Icon from "@mui/icons-material/Face2";
import { signOut } from "firebase/auth";

import { auth } from "../config/firebase";

function Header({ loggedIn }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const headerStyle = {
    fontSize: matches ? "25px" : "36px",
  };

  return (
    <header className="App-header">
      <h1>
        <TipsAndUpdatesTwoToneIcon
          style={headerStyle}
          sx={{ marginRight: "10px" }}
        />
        Keeper
      </h1>
      {loggedIn && (
        <div className="user-icon-wrapper">
          <Face2Icon
            sx={{ height: "35px", width: "35px" }}
            onClick={() =>
              signOut(auth)
                .then(() => (window.location = "/"))
                .catch((ex) => console.log("error while logging out user..."))
            }
          />
          <p>Logout</p>
        </div>
      )}
    </header>
  );
}

const theme = createTheme();

export default function ThemeHelper({ loggedIn }) {
  return (
    <ThemeProvider theme={theme}>
      <Header loggedIn={loggedIn} />
    </ThemeProvider>
  );
}
