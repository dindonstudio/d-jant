import React from "react";
import ImageGallery from "react-image-gallery";

function MyGallery({ galleryData, galleryData2, startIndex =0 }) {
  // Combine the two arrays and add "original" property to image URLs
  const combinedImages = [...galleryData2, ...galleryData].map((img) => ({
    original: img.url, // Prefix "original" before the image URL
  
  }));

  return <ImageGallery slideDuration={5} startIndex={startIndex} additionalClass="z-30" showIndex={true} showBullets={false} showPlayButton={false} showFullscreenButton={false} items={combinedImages} />;
}

export default MyGallery;
