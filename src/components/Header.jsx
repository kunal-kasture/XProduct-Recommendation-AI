import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Header({ mode, onToggleTheme, onOpenMobileDrawer }) {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
        py: 2,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={onOpenMobileDrawer}
          sx={{ display: { xs: "flex", md: "none" } }}
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            color: "#978CD0",
            fontSize: { xs: "1.25rem", md: "1.75rem" },
            fontWeight: 700,
          }}
        >
          Product Recommendation AI
        </Typography>
      </Box>

      <Box
        onClick={onToggleTheme}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: 0.5,
          userSelect: "none",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            display: { xs: "none", md: "block" },
          }}
        >
          {mode === "light" ? "Light" : "Dark"}
        </Typography>
        <IconButton size="small" color="inherit">
          {mode === "dark" ? (
            <Brightness7Icon fontSize="small" />
          ) : (
            <Brightness4Icon fontSize="small" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
