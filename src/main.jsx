import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import App from "./App.jsx";
import { ClientProvider } from "./contexts/ClientContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClientProvider>
      <App />
    </ClientProvider>
  </StrictMode>
);
