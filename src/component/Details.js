import { graphql } from "react-apollo";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { detectCurrencySymbol } from "../reducers/helper";
import parse from "html-react-parser";

const getProductWithID = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency
        amount
      }
      brand
    }
  }
`;

class Details extends PureComponent {
  constructor() {
    super();
    this.state = {
      mainImgUrl: "",
      cartObject: {},
      givenID: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      let image = document.querySelector(".image-options div img:nth-child(1)");
      let mainImgUrl = image.getAttribute("src");
      this.setState({ mainImgUrl: mainImgUrl });
      //let description = document.querySelector(".description");
      //description.innerHTML = this.props.data.product.description;
      let detButtons = document.getElementsByClassName("details-buttons");
      for (let i = 0; i < detButtons.length; i++) {
        detButtons[i].children[0].click();
      }
    }, 300);
    setTimeout(() => {
      if (this.props.data.product.attributes.length < 1) {
        this.chooseDetails();
      }
    }, 400);
  }

  addToCart = () => {
    this.props.addCart(this.state.cartObject);
    if (this.state.cartObject.attr !== "none") {
      this.click();
    }
  };

  chooseDetails = (event) => {
    this.setState({
      cartObject: {
        ...this.state.cartObject,
        id: this.props.data.product.id,
        name: this.props.data.product.name,
        brand: this.props.data.product.brand,
        price: this.props.data.product.prices,
        gallery: this.props.data.product.gallery,
        quantity: 1,
        attr:
          this.props.data.product.attributes.length > 0
            ? {
                ...this.state.cartObject.attr,
                [event.target.getAttribute("detailsname")]:
                  event.target.getAttribute("detailsvalue"),
              }
            : "none",
        attributes: this.props.data.product.attributes,
      },
    });
    if (this.props.data.product.attributes.length > 0) {
      let parentsChildren = event.target.parentNode.children;
      for (let i = 0; i < parentsChildren.length; i++) {
        parentsChildren[i].classList.remove("choosen");
      }
      event.target.classList.add("choosen");
    }
  };

  click = () => {
    let button = document.querySelector(".choosen");
    button.click();
  };

  changeMainImage = (event) => {
    let mainImgUrl = event.target.getAttribute("src");
    this.setState({ mainImgUrl: mainImgUrl });
  };

  displayProductWithID() {
    let data = this.props.data;
    let product = data.product;
    if (data.loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <>
          <div className="details-gallery">
            <div className="image-options">
              {product.gallery.map((images) => (
                <div key={images}>
                  <img
                    src={images}
                    alt="images"
                    onClick={this.changeMainImage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.parentNode.classList.add("none");
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              className={
                "main-image " + (product.inStock ? "" : "not-in-stock")
              }
            >
              <img src={this.state.mainImgUrl} alt="img" />
              <p className={product.inStock ? "none" : ""}>out of stock</p>
            </div>
          </div>
          <div className="product-details">
            <h1>{product.brand}</h1>
            <h2>{product.name}</h2>
            {product.attributes.map((attr) => (
              <div key={attr.id}>
                <h3>{attr.name}:</h3>
                <div className="details-buttons">
                  {attr.items.map((value) =>
                    attr.name === "Color" ? (
                      <button
                        key={value.value}
                        type="button"
                        className="color"
                        onClick={this.chooseDetails}
                        detailsname={attr.name}
                        detailsvalue={value.value}
                      >
                        <div style={{ background: value.value }}></div>
                      </button>
                    ) : (
                      <button
                        key={value.value}
                        type="button"
                        className="no-color"
                        onClick={this.chooseDetails}
                        detailsname={attr.name}
                        detailsvalue={value.value}
                      >
                        {value.value}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
            <h3>price:</h3>
            {product.prices.map((price) =>
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
            <button
              type="button"
              className="add-to-cart"
              disabled={product.inStock ? false : true}
              onClick={this.addToCart}
            >
              add to cart
            </button>
            <div className="description">{parse(product.description)}</div>
          </div>
        </>
      );
    }
  }

  render() {
    return <div className="details wrapper">{this.displayProductWithID()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    filterCategory: state.filterCategory,
    detailsID: state.detailsID,
    defaultCurrency: state.defaultCurrency,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (item) => {
      dispatch({ type: "ADD_TO_CART", item: item });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(getProductWithID, {
    options: (props) => ({
      variables: {
        id: props.detailsID,
      },
    }),
  })(Details)
);
