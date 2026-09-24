import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import { getTheme } from "./theme";

export default function App() {
  const [mode] = useState("light");

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" color="secondary">
          Product Recommendation AI Project Initialized
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
