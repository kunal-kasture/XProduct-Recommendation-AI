import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  borderRadius: 2.5,
  boxShadow: 24,
  p: 3,
};

export default function FeedbackModal({ open, onClose, onSubmit }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit(comment);
    setComment("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <FeedbackIcon sx={{ color: "text.primary" }} />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontSize: "1rem", fontWeight: 600 }}
            >
              Provide Additional Feedback
            </Typography>
          </Stack>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          multiline
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="button"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#D7C7EB",
              color: "#000000",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { backgroundColor: "#C8B5E0", boxShadow: "none" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
