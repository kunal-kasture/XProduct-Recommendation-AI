import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import newChatImg from "../assets/newchat.png";
import editImg from "../assets/edit.png";

export default function Sidebar({ onNewSuggestion }) {
  return (
    <Box
      component="aside"
      sx={{
        width: 260,
        height: "100%",
        bgcolor: "background.paper",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexShrink: 0,
        borderRight: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <Button
        component={Link}
        to="/"
        onClick={onNewSuggestion}
        sx={{
          backgroundColor: "#D7C7EB",
          color: "#000000",
          borderRadius: 2,
          p: 1.5,
          textTransform: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textDecoration: "none",
          "&:hover": { backgroundColor: "#C8B5E0" },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            component="img"
            src={newChatImg}
            alt="New Suggestion"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Want new suggestion?
          </Typography>
        </Stack>
        <Box
          component="img"
          src={editImg}
          alt="Edit"
          sx={{ width: 18, height: 18 }}
        />
      </Button>

      <Button
        component={Link}
        to="/history"
        variant="contained"
        sx={{
          backgroundColor: "#D7C7EB",
          color: "#000000",
          borderRadius: 2,
          py: 1.2,
          textTransform: "none",
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "none",
          "&:hover": { backgroundColor: "#C8B5E0" },
        }}
      >
        Previous Suggestions
      </Button>
    </Box>
  );
}
