import React, { PureComponent } from "react";
import image from "../../images/redo.png";

class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <div></div>
        <div></div>
        <img src={image} alt="logo" />
      </div>
    );
  }
}

export default Logo;
