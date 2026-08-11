import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initGSAP } from "./lib/animations";

initGSAP();

createRoot(document.getElementById("root")!).render(<App />);
