import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CanvasAnnotation = ({ imageData, userId, setImageData }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [selectedShapeType, setSelectedShapeType] = useState("rectangle");

  const loadImage = (rerender = false) => {
    const ctx = canvasRef.current.getContext("2d");
    const backgroundImage = new Image();
    backgroundImage.src = `data:image/png;base64, ${imageData?.data}`;

    if (rerender)
      backgroundImage.onload = function () {
        ctx.drawImage(backgroundImage, 0, 0);

        shapes?.forEach((shape) => {
          ctx.beginPath();
          drawShapeOnCanvas(ctx, shape);
        });
      };
    else ctx.drawImage(backgroundImage, 0, 0);
  };

  useEffect(() => {
    setShapes(imageData?.shapes ?? []);
    console.log(imageData);
    if (canvasRef.current) {
      loadImage(true);
    }
  }, [imageData, canvasRef.current]);

  // ...
  const startDrawing = (e) => {
    if (!isDrawing) {
      setIsDrawing(true);
      setCurrentShape({
        type: selectedShapeType,
        startX: e.clientX - canvasRef.current.offsetLeft,
        startY: e.clientY - canvasRef.current.offsetTop,
        endX: 0,
        endY: 0,
        option: "",
      });
    }
  };

  const drawShape = (e) => {
    if (!isDrawing) return;

    setCurrentShape((prevShape) => ({
      ...prevShape,
      endX: e.clientX - canvasRef.current.offsetLeft,
      endY: e.clientY - canvasRef.current.offsetTop,
    }));

    drawAllShapes();
    drawShapeOnHover(currentShape);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setShapes((prevShapes) => [...prevShapes, { ...currentShape }]);
      setCurrentShape(null);
      showOptions();
    }
  };

  // const clearCanvas = () => {
  //   const ctx = canvasRef.current.getContext("2d");
  //   ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  //   drawAllShapes();
  // };

  const drawAllShapes = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    loadImage();

    shapes.forEach((shape) => {
      ctx.beginPath();
      drawShapeOnCanvas(ctx, shape);
    });
  };

  // ...

  const drawShapeOnCanvas = (ctx, shape) => {
    if (!shape) return;

    if (shape.type === "rectangle") {
      ctx.rect(
        shape.startX,
        shape.startY,
        shape.endX - shape.startX,
        shape.endY - shape.startY
      );
    } else if (shape.type === "circle") {
      const radius = Math.sqrt(
        Math.pow(shape.endX - shape.startX, 2) +
          Math.pow(shape.endY - shape.startY, 2)
      );
      ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
    } else if (shape.type === "triangle") {
      ctx.moveTo(shape.startX + (shape.endX - shape.startX) / 2, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.lineTo(shape.startX, shape.endY);
      ctx.closePath();
    } else if (shape.type === "line") {
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
    }

    ctx.stroke();

    if (shape.option) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "red";
      const textX = (shape.startX + shape.endX) / 2;
      const textY = (shape.startY + shape.endY) / 2;
      ctx.fillText(shape.option, textX, textY - 10); // Adjust Y-coordinate for better positioning
    }
  };

  // ...

  const drawShapeOnHover = (shape) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();

    if (shape.type === "rectangle") {
      ctx.rect(
        shape.startX,
        shape.startY,
        shape.endX - shape.startX,
        shape.endY - shape.startY
      );
    } else if (shape.type === "circle") {
      const radius = Math.sqrt(
        Math.pow(shape.endX - shape.startX, 2) +
          Math.pow(shape.endY - shape.startY, 2)
      );
      ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
    } else if (shape.type === "triangle") {
      ctx.moveTo(shape.startX + (shape.endX - shape.startX) / 2, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.lineTo(shape.startX, shape.endY);
      ctx.closePath();
    } else if (shape.type === "line") {
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();
    ctx.stroke();
  };

  const showOptions = () => {
    const optionsDropdown = document.getElementById("optionsDropdown");
    if (optionsDropdown) {
      optionsDropdown.style.display = "block";
    }
  };

  const selectOption = () => {
    const selectedOption = document.getElementById("options").value;
    if (selectedOption && shapes.length > 0) {
      const updatedShapes = [...shapes];
      updatedShapes[updatedShapes.length - 1].option = selectedOption;
      setShapes(updatedShapes);
      const optionsDropdown = document.getElementById("optionsDropdown");
      if (optionsDropdown) {
        optionsDropdown.style.display = "none";
      }
      drawAllShapes();
    }
  };

  const setShapeType = (shapeType) => {
    setSelectedShapeType(shapeType);
  };

  const saveCanvas = async () => {
    //   const dataURL = canvasRef.current.toDataURL("image/png");
    try {
      const response = await fetch(
        `http://localhost:3002/api/users/${userId}/files/${imageData._id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // image: dataURL,
            shapes: shapes,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setImageData(data);
        // Handle success, e.g., redirect or show a success message
        // navigate("/image-view");
      } else {
        // Handle error, e.g., show an error message
        console.error("Error saving canvas:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving canvas:", error.message);
    }
  };

  return (
    <div style={{}}>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={600}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={drawShape}
        onMouseUp={stopDrawing}
        style={{ border: "2px solid #000", cursor: "crosshair" }}
      ></canvas>
      <div id="optionsDropdown" style={{ display: "none", marginTop: "10px" }}>
        <label htmlFor="options">Choose an option:</label>
        <select id="options">
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
          <option value="line">Straight Line</option>
        </select>
        <button
          style={{ margin: "1px", width: "100px" }}
          onClick={selectOption}
        >
          Select
        </button>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <button className="bu" onClick={() => setShapeType("rectangle")}>
          Rectangle
        </button>
        <button className="bu" onClick={() => setShapeType("circle")}>
          Circle
        </button>
        <button className="bu" onClick={() => setShapeType("triangle")}>
          Triangle
        </button>
        <button className="bu" onClick={() => setShapeType("line")}>
          StraightLine
        </button>
        <button className="bu" onClick={saveCanvas}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CanvasAnnotation;
