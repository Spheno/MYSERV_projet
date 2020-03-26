import React from "react";

export default class ReadableDate extends React.Component {
  formatDate(date) {
    var readable = new Date(date);

    var m = readable.getMonth();
    var d = readable.getDay();
    var y = readable.getFullYear();

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var mlong = months[m];

    var fullDate = mlong + " " + d + ", " + y;
    return fullDate;
  }

  render() {
    return <div>{this.formatDate(this.props.date)}</div>;
  }
}
