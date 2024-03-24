import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/custom.scss";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { getQueryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { WebStorageStateStore } from 'oidc-client-ts';
import { AuthProvider } from 'react-oidc-context';
import { CustomToaster } from "./components/CustomToaster";
import { AppRoutes } from "./pages/AppRoutes";

const queryClient = getQueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const oidcConfig = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: "https://harnesskc.duckdns.org:25651/realms/harness",
  // authority: "https://100.90.251.1:25651/realms/harness",
  client_id: "harness",
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "openid profile email",
  loadUserInfo: true,
};


root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <CustomToaster />
        <Router>
          <NavBar />
          <AppRoutes />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
