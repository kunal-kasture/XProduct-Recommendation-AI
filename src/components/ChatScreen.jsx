import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { format } from "date-fns";

import sampleData from "../aiData/sampleData.json";
import sampleProductData from "../aiData/sampleProductData.json";
import personImg from "../assets/person.png";
import botImg from "../assets/bot.png";

export default function ChatScreen({ messages, setMessages, onSaveChat }) {
  const [inputVal, setInputVal] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const resolveAnswer = (userQuery) => {
    const q = userQuery.trim().toLowerCase();

    const catMatch = sampleData.find(
      (item) => item.question.toLowerCase() === q,
    );
    if (catMatch) {
      setActiveCategory(catMatch.question);
      return [catMatch.response];
    }

    if (activeCategory) {
      const combined = `${activeCategory} ${userQuery.trim()}`.toLowerCase();
      const prodMatch = sampleProductData.find(
        (item) => item.question.toLowerCase() === combined,
      );
      if (prodMatch) {
        return Array.isArray(prodMatch.response)
          ? prodMatch.response
          : [prodMatch.response];
      }
    }

    return ["Sorry, I did not understand your query!"];
  };

  const handleSendMessage = (textOverride) => {
    const query = (textOverride || inputVal).trim();
    if (!query) return;

    const time = format(new Date(), "hh:mm a");
    const replies = resolveAnswer(query);

    const userMessage = { sender: "user", text: query, time };
    const botMessages = replies.map((reply) => ({
      sender: "ai",
      text: reply,
      time,
      liked: null,
      rating: 0,
      feedback: "",
    }));

    setMessages((prev) => [...prev, userMessage, ...botMessages]);
    setInputVal("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: "auto", pr: { xs: 0, md: 1 }, pb: 2 }}>
        {messages.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: { xs: 4, md: 8 } }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Hi, Please tell me what you want?
            </Typography>
            <Box
              component="img"
              src={botImg}
              alt="Bot Welcome"
              sx={{ width: 68, height: 68, mb: 4, objectFit: "contain" }}
            />
            <Grid
              container
              spacing={2}
              justifyContent="center"
              maxWidth={800}
              mx="auto"
            >
              {["Jeans", "Smartphone", "Laptop", "T-Shirt"].map((item) => (
                <Grid item xs={12} sm={6} key={item}>
                  <Card
                    onClick={() => handleSendMessage(item)}
                    sx={{
                      p: 2.5,
                      cursor: "pointer",
                      borderRadius: 2,
                      textAlign: "left",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      transition: "transform 0.15s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get immediate AI generated response
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Stack spacing={2}>
            {messages.map((msg, idx) => (
              <Card
                key={idx}
                sx={{
                  display: "flex",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  backgroundColor: "background.paper",
                }}
              >
                <Box
                  component="img"
                  src={msg.sender === "user" ? personImg : botImg}
                  alt={msg.sender}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    mr: 2,
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {msg.sender === "user"
                      ? "You"
                      : "Product Recommendation AI"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ my: 0.5, whiteSpace: "pre-line" }}
                  >
                    {msg.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {msg.time}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        sx={{
          display: "flex",
          gap: 1.5,
          mt: 2,
          pt: 1,
        }}
      >
        <TextField
          fullWidth
          size="small"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            messages.length === 0
              ? "Please tell me about your query!"
              : "Anything Else?"
          }
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#D7C7EB",
            color: "#000000",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#C8B5E0", boxShadow: "none" },
            px: 3,
          }}
        >
          Ask
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            onSaveChat();
          }}
          sx={{
            backgroundColor: "#D7C7EB",
            color: "#000000",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#C8B5E0", boxShadow: "none" },
            px: 3,
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
