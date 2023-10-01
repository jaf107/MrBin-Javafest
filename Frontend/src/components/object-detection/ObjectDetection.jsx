import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-models/coco";
import "./ObjectDetection.css";
import { Link } from "react-router-dom";
function ObjectDetection() {
  const [image, setImage] = useState(null);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const performObjectDetection = async () => {
    setIsLoading(true);

    // Load the COCO-SSD model
    // const model = await tf.loadGraphModel('model.json');

    // // Prepare the image for prediction
    // const inputImage = document.getElementById('input-image');
    // const imageTensor = tf.browser.fromPixels(inputImage);
    // const expandedImage = imageTensor.expandDims(0);

    // // Perform object detection
    // const predictions = await model.executeAsync(expandedImage);
    // const objects = predictions[1].arraySync()[0];
    let objects = ["pen", "paper"];

    setDetectedObjects(objects);
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="container object_detection_page shadow-sm center mb-3">
        <h4 className="  text-center bg-light p-4">OBJECT DETECTION</h4>

        <br />
        {image && (
          <div>
            <img
              id="input-image"
              src={image}
              alt="Uploaded"
              width="600"
              height="auto"
            />
          </div>
        )}
        <br />
        <label htmlFor="file-input" className="custom-upload-button">
          Upload Image
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <br />
        {image && (
          <button
            id="detect-button"
            className="m-3 mb-5"
            onClick={performObjectDetection}
            disabled={!image || isLoading}
          >
            Detect Objects
          </button>
        )}
        <br />
        <div>
          {isLoading && <p>Loading...</p>}
          {!isLoading && detectedObjects.length > 0 && (
            <div>
              <h2>Detected Objects:</h2>
              <ul>
                {detectedObjects.map((obj, index) => (
                  // <li key={index}>
                  //   {obj.class} (Confidence: {obj.score.toFixed(2)})
                  // </li>
                  <li>{obj}</li>
                ))}
              </ul>

              <Link className="btn btn-info w-30" to={"/addProduct"}>
                Add Product
              </Link>
              <div />
            </div>
          )}
        </div>
        <div></div>
      </div>

      <Footer />
    </div>
  );
}

export default ObjectDetection;
