import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Product from "./Product";

class ProductList extends PureComponent {
  render() {
    return (
      <div className="product-list wrapper">
        <h1>{this.props.filterCategory}</h1>
        <Product />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filterCategory: state.filterCategory,
  };
};

export default connect(mapStateToProps)(ProductList);
