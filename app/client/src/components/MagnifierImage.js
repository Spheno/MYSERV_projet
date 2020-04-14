import React from "react";
import Zoom from "react-medium-image-zoom";

const MagnifierImage = (props) => {
  const { imageSrc, imageAlt } = props;

  return (
    <>
      <Zoom>
        <img alt={imageAlt} src={imageSrc} width="500" />
      </Zoom>
    </>
  );
};

export default MagnifierImage;
