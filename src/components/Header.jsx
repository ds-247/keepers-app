import React from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";

function Header() {
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
    </header>
  );
}

const theme = createTheme();

export default function ThemeHelper() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}
