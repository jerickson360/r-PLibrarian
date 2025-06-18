import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// Corrected: Use appWindow to get the current window instance
import { getCurrentWindow } from '@tauri-apps/api/window';

// Add the 'dark' class to the html element for Tailwind CSS
document.documentElement.classList.add('dark');

// Pass the window label to the App component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App windowLabel={getCurrentWindow().label} />
  </React.StrictMode>,
);