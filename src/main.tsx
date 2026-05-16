import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"
// import App from "./01 Counter Component/App";
import App from "./03 Uncontrolled Form/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
