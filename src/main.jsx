import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./index.css"

const el = document.getElementById("lp-root");
createRoot(el).render(<App/>);
