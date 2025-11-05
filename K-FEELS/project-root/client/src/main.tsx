import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from "../k-feels-vite/src/store";
import App from "./App";
import "./styles.css";


const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");


const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);