import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./sign";
import Home from "./home";
import LoginForm from "./log";
import CanvasAnnotation from "./AnnotationCanvas";
import { MAX_SCALE } from "react-drawing-board/lib/enums/Tool";
import ImageView from "./ImageView";

function App() {
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem("userId")
  );

  return (
    <>
      {/* <div
        style={{
          height: "100px",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent background color
          backdropFilter: "blur(10px)", // Apply a blur effect
          position: "fixed", // Fix the header position
          top: 0, // Align to the top of the viewport
          left: 0, // Align to the left of the viewport
          width: "100%", // Full width
          zIndex: 999, // Ensure the header is on top of other content
        }}
      >
        <header>
          <h1> CanvasAnnotationTool</h1>
        </header>
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginForm setCurrentUser={setCurrentUserId} />}
          >
            {" "}
          </Route>
          <Route
            path="/sign"
            element={<Login setCurrentUser={setCurrentUserId} />}
          />
          <Route path="/home" element={<Home userId={currentUserId} />} />
          <Route
            path="image-view/:imageId"
            element={<ImageView userId={currentUserId} />}
          />
          {/* <Route
            path="/image-view/:imageId"
            element={
              <CanvasAnnotation
                // selectedImage={selectedImage}
                userId={currentUserId}
                setUser={setCurrentUserId}
              />
            }
          /> */}
        </Routes>
      </BrowserRouter>
      {/* <footer
        style={{
          position: "fixed", // Fix the footer position
          bottom: 0, // Align to the bottom of the viewport
          left: 0, // Align to the left of the viewport
          width: "100%", // Full width
          textAlign: "center", // Center align content
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent background color
          backdropFilter: "blur(10px)", // Apply a blur effect
          zIndex: 999, // Ensure the footer is on top of other content
        }}
      >
        <p>© 2024 manojgowdasj03</p>
      </footer> */}
    </>
  );
}

export default App;
