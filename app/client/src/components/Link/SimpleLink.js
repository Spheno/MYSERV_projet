import React from "react";

export default class SimpleLink extends React.Component {
  render() {
    return (
      <a href={this.props.href} className="no-underline text-gray-600 hover:text-orange-500">
        {this.props.name}
      </a>
    );
  }
}
