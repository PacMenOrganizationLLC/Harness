
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
import { Session } from "./pages/sessions/Session";
import { Toaster } from "react-hot-toast";
import { CompetitionDetails } from "./pages/competitions/CompetitionDetails";

const queryClient = getQueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/events" element={<Events />} />

          <Route path="/competition/:id" element={<CompetitionDetails/>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
