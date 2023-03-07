import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function SearchResults(props) {
  const [imageToShow, setImageToShow] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  const handlePhotoClick = (image) => {
    //set imageToShow to be the one that's been clicked on
    setImageToShow(image);
    //set lightbox visibility to true
    setLightBoxDisplay(true);
  };

  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  const { results } = props.field;
  if (results.length) {
    return (
      <div className="row">
        {results.map((result) => {
          return (
            <a key={result.id} 
            // href={result.previewURL} 
            className="column">
              <img
                className="image"
                src={result.previewURL}
                alt={result.user}
                onClick={() => handlePhotoClick(result.previewURL)}
              />
            </a>
          );
        })}

        {lightboxDisplay ? (
          <div className="modal" onClick={hideLightBox}>
            <TransformWrapper>
              <TransformComponent>
                <img className="modal-img" src={imageToShow}></img>
              </TransformComponent>
            </TransformWrapper>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default SearchResults;
