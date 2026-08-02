import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { enableScrollPerformance } from "./lib/scrollPerformance";

enableScrollPerformance();

createRoot(document.getElementById("root")!).render(<App />);
