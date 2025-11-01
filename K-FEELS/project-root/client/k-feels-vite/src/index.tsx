// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// Get the root element from the HTML
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

// Create a React 18 root
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
