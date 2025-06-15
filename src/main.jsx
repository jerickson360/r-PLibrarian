import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { appWindow } from '@tauri-apps/api/window';

// Add the 'dark' class to the html element for Tailwind CSS
document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App windowLabel={appWindow.label} />
  </React.StrictMode>,
);