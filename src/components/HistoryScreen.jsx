import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Card,
  Stack,
  Rating,
} from "@mui/material";
import personImg from "../assets/person.png";
import botImg from "../assets/bot.png";

export default function HistoryScreen({ conversations }) {
  const [filterRating, setFilterRating] = useState("All Ratings");

  const filtered = conversations.filter((conv) => {
    if (filterRating === "All Ratings") return true;
    return conv.rating === Number(filterRating);
  });

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Previous Suggestions
      </Typography>

      <Box sx={{ mb: 3, maxWidth: 220 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 0.5 }}
        >
          Filter by rating
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            sx={{ bgcolor: "background.paper", borderRadius: 1 }}
          >
            <MenuItem value="All Ratings">All Ratings</MenuItem>
            <MenuItem value="1">1 Star</MenuItem>
            <MenuItem value="2">2 Stars</MenuItem>
            <MenuItem value="3">3 Stars</MenuItem>
            <MenuItem value="4">4 Stars</MenuItem>
            <MenuItem value="5">5 Stars</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
        Today's chats
      </Typography>

      {filtered.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No conversations saved yet.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {filtered.map((conv) => (
            <Box
              key={conv.id}
              sx={{
                bgcolor: "rgba(215, 199, 235, 0.25)",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Stack spacing={1.5}>
                {conv.messages.map((m, i) => (
                  <Card
                    key={i}
                    sx={{
                      display: "flex",
                      p: 1.5,
                      boxShadow: "none",
                      bgcolor: "background.paper",
                      borderRadius: 1.5,
                    }}
                  >
                    <Box
                      component="img"
                      src={m.sender === "user" ? personImg : botImg}
                      alt={m.sender}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        mr: 2,
                        objectFit: "cover",
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {m.sender === "user"
                          ? "You"
                          : "Product Recommendation AI"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ my: 0.5, whiteSpace: "pre-line" }}
                      >
                        {m.text}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {m.time}
                      </Typography>

                      {m.rating > 0 && (
                        <Box sx={{ mt: 0.5 }}>
                          <Rating value={m.rating} readOnly size="small" />
                        </Box>
                      )}
                      {m.feedback && (
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{
                            mt: 0.5,
                            fontStyle: "italic",
                            color: "text.secondary",
                          }}
                        >
                          Feedback: {m.feedback}
                        </Typography>
                      )}
                    </Box>
                  </Card>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
