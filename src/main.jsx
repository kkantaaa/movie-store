import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./Contexts/GlobalContext.jsx";
import { Toaster } from "@/lib/utils/ui/toaster";

import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider>
        <App />
        <Toaster />
      </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>
);
