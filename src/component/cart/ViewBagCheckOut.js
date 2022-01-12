import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class ViewBagCheckOut extends PureComponent {
  closeOverlay = () => {
    document.querySelector(".cart-image").click();
  };
  render() {
    return (
      <div className="view-bag-check-out">
        <Link onClick={this.closeOverlay} to="/cart">
          view bag
        </Link>
        <button type="button" disabled={this.props.disabled}>
          check out
        </button>
      </div>
    );
  }
}

export default ViewBagCheckOut;
