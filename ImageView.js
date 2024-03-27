import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CanvasAnnotation from "./AnnotationCanvas";

function ImageView({ userId }) {
  const [imageData, setImageData] = useState(null);
  const { imageId } = useParams();
  console.log(userId, imageId);

  useEffect(() => {
    // Function to fetch image data
    async function fetchImageData() {
      try {
        // Make a GET request to your server endpoint
        const response = await axios.get(
          `http://localhost:3002/api/users/${userId}/files/${imageId}`,
          {
            // params: {
            //   username: userId,
            //   imageId: imageId,
            // },
          }
        );

        // If the request is successful, the image data should be in the response data
        const imageData = response.data;
        setImageData(imageData);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    }

    // Call the fetchImageData function when component mounts
    fetchImageData();

    // // Clean up function
    // return () => {
    //   // Optionally, you can cancel any pending requests or do cleanup here
    // };
  }, [userId, imageId]);

  return (
    <div
      style={{
        backgroundColor: "rgba(240, 241, 228, 0.8)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "100px",
      }}
    >
      <CanvasAnnotation
        imageData={imageData}
        setImageData={setImageData}
        userId={userId}
      />
    </div>
  );
}

export default ImageView;
