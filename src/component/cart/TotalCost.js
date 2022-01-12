import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { detectCurrencySymbol } from "../../reducers/helper";

class TotalCost extends PureComponent {
  render() {
    return (
      <div className="total-cost">
        <h1>total</h1>
        <h3>
          <span>{detectCurrencySymbol(this.props.defaultCurrency)}</span>
          <span>{this.props.totalCost}</span>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalCost: state.totalCost,
    defaultCurrency: state.defaultCurrency,
  };
};

export default connect(mapStateToProps)(TotalCost);
