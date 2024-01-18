
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/custom.scss";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { NavBar } from "./components/NavBar";
import { Games } from "./pages/games/Games";
import { getQueryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Session } from "./pages/sessions/Session";
import { Toaster } from "react-hot-toast";
import { CompetitionDetails } from "./pages/competitions/CompetitionDetails";
import { Endpoints } from "./pages/games/endpoints/Endpoints";
import { AuthRequired } from "./AuthRequired";
import { WebStorageStateStore } from 'oidc-client-ts';
import { AuthProvider } from 'react-oidc-context';
import { CompetitionList } from "./pages/competitions/CompetitionList";

const queryClient = getQueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const oidcConfig = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  // authority: "https://harnesskc.duckdns.org:1234/realms/harness",
  authority: "https://100.90.251.1:25651/realms/harness",
  client_id: "harness",
  redirect_uri: window.location.origin,
  response_type: 'code',
  scope: "openid profile email",
  loadUserInfo: true,
};

root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthRequired>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/endpoints/:gameId" element={<Endpoints />} />
              <Route path="/competitions" element={<CompetitionList />} />
              <Route path="/competition/:id" element={<CompetitionDetails />} />
              <Route path="/session/:id" element={<Session />} />
            </Routes>
          </Router>
        </AuthRequired>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
