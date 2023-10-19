import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./Contexts/GlobalContext.jsx";
import { Toaster } from "@/lib/utils/ui/toaster"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <Toaster/>
    </ContextProvider>
  </React.StrictMode>
);
