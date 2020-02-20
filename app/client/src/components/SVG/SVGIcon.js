import React from "react";
import SVG from "react-inlinesvg";

export default class SVGIcon extends React.Component {
  render() {
    return(
        <SVG src={this.props.src} className={this.props.cls} />
    );
  }
}
