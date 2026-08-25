import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./clean.css";
import "./knowledge.css";
import "./result-search.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>,
);

