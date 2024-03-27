import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Example from "./example";
// import "./styles.css";
import home from "./home";
import AnnotationCanvas from "./AnnotationCanvas";
import Sign from "./sign";
import Log from "./log";

import reportWebVitals from "./reportWebVitals";
import Home from "./home";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
const imageUrl = "public/photo1706612887.jpeg";
root.render(
  <React.StrictMode>
    <App />

    {/* <Example /> */}
    {/* <Log /> */}
    {/* <AnnotationApp/> */}

    {/* <AnnotationCanvas/>  */}
    {/* <ImagaPreview/> */}
    {/* <DrawingCanvas/> */}
    {/* <Sign /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
