import { createRoot } from "react-dom/client";
import App from "@app/App";

import "./index.css";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(<App />);
