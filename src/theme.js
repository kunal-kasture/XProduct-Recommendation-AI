import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#D7C7EB",
        contrastText: "#000000",
      },
      secondary: {
        main: "#978CD0",
      },
      background: {
        default: mode === "light" ? "rgba(215, 199, 235, 0.12)" : "#1e1e24",
        paper: mode === "light" ? "#FFFFFF" : "#2b2a33",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
        secondary:
          mode === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.7)",
      },
    },
    typography: {
      fontFamily: "Ubuntu, sans-serif",
      h1: {
        fontSize: "1.75rem",
        fontWeight: 700,
        color: "#978CD0",
      },
    },
  });
