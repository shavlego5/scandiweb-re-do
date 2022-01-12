import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import cart from "../images/shopping-cart.png";
import { detectCurrencySymbol } from "../reducers/helper";

const getProductDetails = gql`
  {
    category {
      products {
        id
        name
        inStock
        category
        prices {
          currency
          amount
        }
        brand
        gallery
        attributes {
          id
          name
          items {
            value
            id
          }
        }
      }
    }
  }
`;

class Product extends PureComponent {
  constructor() {
    super();
    this.state = {
      cartObject: {},
    };
  }

  addToCart = () => {
    this.props.addCart(this.state.cartObject);
  };

  chooseDetails = (event) => {
    let item = this.props.data.category.products.filter(
      (items) => items.id === event.target.getAttribute("id")
    );

    let attributes = {};
    for (let i = 0; i < item[0].attributes.length; i++) {
      attributes[item[0].attributes[i].name] =
        item[0].attributes[i].items[0].value;
    }
    this.setState(
      {
        cartObject: {
          ...this.state.cartObject,
          id: item[0].id,
          name: item[0].name,
          brand: item[0].brand,
          price: item[0].prices,
          gallery: item[0].gallery,
          quantity: 1,
          attr: attributes,
          attributes: item[0].attributes,
        },
      },
      this.addToCart
    );
  };

  getProductID = (event) => {
    this.props.getID(event.target.getAttribute("id"));
  };

  displayProduct() {
    let data = this.props.data;
    if (data.loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <>
          {data.category.products.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className={
                "product-box " +
                (item.inStock ? "" : "opacity ") +
                (this.props.filterCategory === "all"
                  ? ""
                  : item.category === this.props.filterCategory
                  ? ""
                  : "none")
              }
              onClick={this.getProductID}
            >
              <Link to="details" id={item.id}>
                <div className="products-gallery">
                  {item.gallery.map((images) => (
                    <img key={images} src={images} alt={item.brand} />
                  ))}
                  <p className={item.inStock ? "none" : ""}>out of stock</p>
                </div>
                <h2>{item.brand}</h2>
                <p>{item.name}</p>
                {item.prices.map((price) =>
                  price.currency === this.props.defaultCurrency ? (
                    <h3 key={price.currency}>
                      <span>
                        {detectCurrencySymbol(this.props.defaultCurrency)}
                      </span>
                      <span>{price.amount}</span>
                    </h3>
                  ) : (
                    <p key={price.currency} className="none"></p>
                  )
                )}
              </Link>
              <button
                type="button"
                className={item.inStock ? "" : "none"}
                id={item.id}
                onClick={this.chooseDetails}
              >
                <img src={cart} alt="cart" />
              </button>
            </div>
          ))}
        </>
      );
    }
  }
  render() {
    return <div className="product">{this.displayProduct()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    filterCategory: state.filterCategory,
    defaultCurrency: state.defaultCurrency,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getID: (id) => {
      dispatch({ type: "GET_PRODUCT_ID", id: id });
    },
    addCart: (item) => {
      dispatch({ type: "ADD_TO_CART", item: item });
    },
  };
};

export default graphql(getProductDetails)(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
