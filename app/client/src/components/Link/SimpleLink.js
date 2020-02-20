import React from "react";

export default class SimpleLink extends React.Component {
  render() {
    return (
      <a href="#" class="no-underline text-gray-600 hover:text-orange-500">
        {this.props.name}
      </a>
    );
  }
}
