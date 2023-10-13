import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/custom.scss";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { NavBar } from "./components/NavBar";
import { Events } from "./pages/events/Events";
import { Games } from "./pages/games/Games";
import { getQueryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionManagement } from "./pages/sessions/Session";

const queryClient = getQueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/games" element={<Games />} />
          <Route path="/session" element={<SessionManagement />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
