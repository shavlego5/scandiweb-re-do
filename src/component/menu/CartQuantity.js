import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CartItemsCount from "../cart/CartItemsCount";
import image from "../../images/cart.png";
import Cart from "../Cart";

class CartQuantity extends PureComponent {
  constructor() {
    super();
    this.state = {
      overshow: "",
    };
  }
  toggleOverlay = () => {
    this.state.overshow === ""
      ? this.setState({ overshow: "overshow" })
      : this.setState({ overshow: "" });
  };
  onClickOutside = () => {
    let vissible = document.querySelector(".overshow");
    if (vissible) {
      this.toggleOverlay();
    }
    document.removeEventListener("click", this.onClickOutside);
  };
  render() {
    return (
      <div
        className="cart-quantity"
        onMouseLeave={() => {
          let vissible = document.querySelector(".overshow");
          if (vissible) {
            document.addEventListener("click", this.onClickOutside);
          }
        }}
        onMouseEnter={() => {
          document.removeEventListener("click", this.onClickOutside);
        }}
      >
        <img
          className="cart-image"
          src={image}
          onClick={this.toggleOverlay}
          alt="cart"
        />
        <CartItemsCount />
        <div className={"cart-overlay " + this.state.overshow}>
          <div
            className="cart-overlay-container"
            onMouseLeave={() => {
              let vissible = document.querySelector(".overshow");
              if (vissible) {
                document.addEventListener("click", this.onClickOutside);
              }
            }}
            onMouseEnter={() => {
              document.removeEventListener("click", this.onClickOutside);
            }}
          >
            <p>
              <span>My Bag, </span>
              {this.props.cartsItemsCount}{" "}
              <span>{this.props.cartsItemsCount > 1 ? "items" : " item"}</span>
            </p>
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartsItemsCount: state.cartsItemsCount,
  };
};

export default connect(mapStateToProps)(CartQuantity);
