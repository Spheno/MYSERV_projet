import React, { Component } from "react";
import Zoom from 'react-medium-image-zoom'


export default class MagnifierImage extends Component {
  render() {
    const { imageSrc, imgAlt } = this.props;

    return (
      <>
        <Zoom>
          <img
            alt={imgAlt}
            src={imageSrc}
          />
        </Zoom>
      </>
    );
  }
}
