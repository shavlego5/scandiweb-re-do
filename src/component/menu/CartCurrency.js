import React, { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher";

class CartCurrency extends PureComponent {
  render() {
    return (
      <div className="cart-currency">
        <CurrencySwitcher />
      </div>
    );
  }
}

export default CartCurrency;
