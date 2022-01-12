import React, { PureComponent } from "react";
import Filter from "./menu/Filter";
import Logo from "./menu/Logo";
import CartCurrency from "./menu/CartCurrency";
import CartQuantity from "./menu/CartQuantity";

class Menu extends PureComponent {
  render() {
    return (
      <div className="menu wrapper">
        <Filter />
        <Logo />
        <div className="right-menu">
          <CartCurrency />
          <CartQuantity />
        </div>
      </div>
    );
  }
}

export default Menu;
