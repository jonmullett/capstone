import React from "react";
import image1 from "./images/image1.jpeg";

const imagesList = [
  {
    id: 1,
    src: image1,
    alt: "Image 1",
  },
];

function ImagesComponent() {
  return (
    <div>
      {imagesList.map((image) => (
        <img key={image.id} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
}

export default ImagesComponent;
