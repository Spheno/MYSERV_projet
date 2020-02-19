import React from "react";

// purple background with 75% opacity
// use : <img className="absolute inset-0 w-full h-full object-cover object-center" src="..." alt="" />
//       <PurpleBG />
class PurpleBG extends React.Component {
  render() {
    return (
      <div className="absolute inset-0 w-full h-full bg-purple-800 opacity-75"></div>
    );
  }
}

export default PurpleBG;
