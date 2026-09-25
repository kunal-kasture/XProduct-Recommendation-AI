import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

import { getTheme } from "./theme";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatScreen from "./components/ChatScreen";
import HistoryScreen from "./components/HistoryScreen";

export default function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeSession, setActiveSession] = useState([]);
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("chat_history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(conversations));
  }, [conversations]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const handleSaveActiveChat = (msgsToSave) => {
    const list = msgsToSave || activeSession;
    if (!list || list.length === 0) return;

    const maxRating = list.reduce((max, m) => Math.max(max, m.rating || 0), 0);
    const newRecord = {
      id: Date.now(),
      date: "Today's chats",
      messages: list,
      rating: maxRating,
    };

    setConversations((prev) => [newRecord, ...prev]);
  };

  const handleNewSuggestion = () => {
    if (activeSession.length > 0) {
      handleSaveActiveChat(activeSession);
    }
    setActiveSession([]);
    navigate("/");
    setMobileDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <Sidebar
          mobileOpen={mobileDrawerOpen}
          onCloseMobile={() => setMobileDrawerOpen(false)}
          onNewSuggestion={handleNewSuggestion}
          onNavigateHistory={() => {
            navigate("/history");
            setMobileDrawerOpen(false);
          }}
        />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Header
            mode={mode}
            onToggleTheme={toggleTheme}
            onOpenMobileDrawer={() => setMobileDrawerOpen(true)}
          />

          <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, overflowY: "auto" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <ChatScreen
                    messages={activeSession}
                    setMessages={setActiveSession}
                    onSaveChat={() => handleSaveActiveChat(activeSession)}
                  />
                }
              />
              <Route
                path="/history"
                element={<HistoryScreen conversations={conversations} />}
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
