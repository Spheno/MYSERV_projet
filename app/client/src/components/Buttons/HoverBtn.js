import React from "react";
import Tooltip from "./Tooltip";

export default class HoverBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      icon: null,
      text: "Aucun texte à afficher"
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  componentDidMount() {
    this.setState({ icon: this.props.icon, text: this.props.text });
  }

  mouseOver() {
    this.setState({ hover: true });
  }

  mouseOut() {
    this.setState({ hover: false });
  }

  render() {
    const { hover, icon, text } = this.state;

    return (
      <span onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className="w-5 h-5 mr-3">
        {icon}
        {hover ? <Tooltip text={text} /> : null}
      </span>
    );
  }
}
