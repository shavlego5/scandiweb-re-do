import React, { PureComponent } from "react";
import { connect } from "react-redux";

class CartItemsCount extends PureComponent {
  render() {
    return (
      <div
        className={
          "cart-items-count " + (this.props.cartsItemsCount ? "" : "none")
        }
      >
        {this.props.cartsItemsCount}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartsItemsCount: state.cartsItemsCount,
  };
};

export default connect(mapStateToProps)(CartItemsCount);
