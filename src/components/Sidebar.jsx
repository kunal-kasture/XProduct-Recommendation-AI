import React from "react";
import { Box, Button, Typography, Drawer, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import newChatImg from "../assets/newchat.png";
import editImg from "../assets/edit.png";

export default function Sidebar({
  mobileOpen,
  onCloseMobile,
  onNewSuggestion,
  onNavigateHistory,
}) {
  const content = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        bgcolor: "background.paper",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <Box
        sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end" }}
      >
        <Button onClick={onCloseMobile} startIcon={<CloseIcon />} size="small">
          Close
        </Button>
      </Box>

      <Button
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
        onClick={onNavigateHistory}
        variant="contained"
        sx={{
          backgroundColor: "#D7C7EB",
          color: "#000000",
          borderRadius: 2,
          py: 1.2,
          textTransform: "none",
          fontWeight: 600,
          "&:hover": { backgroundColor: "#C8B5E0" },
          boxShadow: "none",
        }}
      >
        Previous Suggestions
      </Button>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" }, flexShrink: 0 }}>
        {content}
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {content}
      </Drawer>
    </>
  );
}
