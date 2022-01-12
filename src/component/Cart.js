import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { detectCurrencySymbol } from "../reducers/helper";
import TotalCost from "./cart/TotalCost";
import image from "../images/left.png";
import ViewBagCheckOut from "./cart/ViewBagCheckOut";

class Cart extends PureComponent {
  constructor() {
    super();
    this.state = {
      change: [],
    };
  }

  setVissible() {
    setTimeout(() => {
      let cartGallery = document.getElementsByClassName(
        "cart-gallery-container"
      );
      for (let i = 0; i < cartGallery.length; i++) {
        cartGallery[i].children[0].setAttribute("vissible", true);
      }
    }, 1000);
  }

  getProductID = (event) => {
    this.props.getID(event.target.getAttribute("id"));
  };

  changeProperty = (event) => {
    let givenID = event.target.getAttribute("givenid");
    let value = event.target.getAttribute("value");
    let name = event.target.getAttribute("name");
    this.setState({ change: [name, value, givenID] });
    setTimeout(() => {
      this.props.change(this.state.change);
      this.forceUpdate();
    }, 100);
    this.forceUpdate();
  };

  increment = (event) => {
    this.props.inc(event.target.getAttribute("givenid"));
  };

  decrement = (event) => {
    this.props.dec(event.target.getAttribute("givenid"));
  };

  deleteCartItem = (event) => {
    this.props.delete(event.target.getAttribute("givenid"));
  };

  next = (event) => {
    let gallery = event.target.parentNode.children[2];
    let index;
    for (let i = 0; i < gallery.children.length; i++) {
      if (
        gallery.children[i].getAttribute("vissible") &&
        gallery.children[i].nextElementSibling
      ) {
        index = i;
        gallery.children[i].style.zIndex = 0;
        gallery.children[i].nextElementSibling.style.zIndex = 1;
        if (gallery.children[i].previousSibling) {
          gallery.children[i].previousElementSibling.style.zIndex = 0;
        }
      }
    }
    if (gallery.children.length - 1 !== index && index !== undefined) {
      gallery.children[index].nextElementSibling.setAttribute("vissible", true);
      gallery.children[index].removeAttribute("vissible");
    } else {
      gallery.children[0].setAttribute("vissible", true);
      for (let i = 0; i < gallery.children.length; i++) {
        gallery.children[i].style.zIndex = 0;
      }
      gallery.children[0].style.zIndex = 1;
      gallery.children[gallery.children.length - 1].removeAttribute("vissible");
    }
  };

  prev = (event) => {
    let gallery = event.target.parentNode.children[2];
    let index;
    for (let i = 0; i < gallery.children.length; i++) {
      if (
        gallery.children[i].getAttribute("vissible") &&
        gallery.children[i].previousElementSibling
      ) {
        index = i;
        gallery.children[i].removeAttribute("vissible");
        gallery.children[i].style.zIndex = 0;
        gallery.children[i].previousElementSibling.style.zIndex = 1;
        gallery.children[i].previousElementSibling.setAttribute(
          "vissible",
          true
        );
      }
    }
    if (index === undefined) {
      gallery.children[0].removeAttribute("vissible");
      gallery.children[0].style.zIndex = 0;
      gallery.children[gallery.children.length - 1].style.zIndex = 1;
      gallery.children[gallery.children.length - 1].setAttribute(
        "vissible",
        true
      );
    }
  };

  getAttribut() {
    this.setVissible();
    return (
      <>
        <div className="cart-items">
          {this.props.cart.map((item) => (
            <div key={item.givenID} className="cart-item-container">
              <div
                className="delete"
                givenid={item.givenID}
                onClick={this.deleteCartItem}
              >
                +
              </div>
              <div key={item.givenID}>
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <h2>{item.brand}</h2>
                    <Link
                      onClick={this.getProductID}
                      id={item.id}
                      to="/details"
                    >
                      {item.name}
                    </Link>
                    {item.price.map((price) =>
                      price.currency === this.props.defaultCurrency ? (
                        <h3 key={price.currency}>
                          <span>
                            {detectCurrencySymbol(this.props.defaultCurrency)}
                          </span>
                          <span>
                            {Math.floor(price.amount * item.quantity * 100) /
                              100}
                          </span>
                        </h3>
                      ) : (
                        <p key={price.currency} className="none"></p>
                      )
                    )}
                  </div>
                </div>
                <div className="product-details">
                  {item.attributes.map((attribute) => (
                    <div key={attribute.name} className="cart-buttons">
                      {attribute.name === "Size" ||
                      attribute.name === "Color" ? (
                        <p key={attribute.name} className="none">
                          {attribute.name}
                        </p>
                      ) : (
                        <p key={attribute.name}>{attribute.name}</p>
                      )}
                      <div key={attribute.value}>
                        {attribute.items.map((attr) =>
                          attribute.name === "Color" ? (
                            <button
                              givenid={item.givenID}
                              name={attribute.name}
                              value={attr.value}
                              key={attr.value}
                              type="button"
                              bg={attr.value}
                              className={
                                item.id +
                                " color " +
                                (attr.value === item.attr[attribute.name]
                                  ? "choosen"
                                  : "")
                              }
                              onLoad={this.makeChoosenPropertiesDisabled(
                                item.id
                              )}
                              onClick={this.changeProperty}
                            >
                              <div style={{ background: attr.value }}></div>
                            </button>
                          ) : (
                            <button
                              givenid={item.givenID}
                              name={attribute.name}
                              value={attr.value}
                              key={attr.value}
                              type="button"
                              className={
                                item.id +
                                " no-color " +
                                (attr.value === item.attr[attribute.name]
                                  ? "choosen"
                                  : "")
                              }
                              onLoad={this.makeChoosenPropertiesDisabled(
                                item.id,
                                attribute.name
                              )}
                              onClick={this.changeProperty}
                            >
                              {attr.value}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="quantity">
                  <button
                    type="button"
                    givenid={item.givenID}
                    onClick={this.increment}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    type="button"
                    givenid={item.givenID}
                    disabled={item.quantity === 1 ? true : false}
                    onClick={this.decrement}
                  >
                    -
                  </button>
                </div>
                <div className="cart-gallery">
                  <button
                    type="button"
                    onClick={this.prev}
                    className={item.gallery.length > 1 ? "" : "none"}
                  >
                    <img src={image} alt="not found" />
                  </button>
                  <button
                    type="button"
                    onClick={this.next}
                    className={item.gallery.length > 1 ? "" : "none"}
                  >
                    <img src={image} alt="not found" />
                  </button>
                  <div className="cart-gallery-container">
                    {item.gallery.map((src) => (
                      <img key={src} src={src} alt="not found" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <TotalCost />
        <ViewBagCheckOut
          disabled={this.props.cartsItemsCount === 0 ? true : false}
        />
      </>
    );
  }
  makeChoosenPropertiesDisabled(arg0) {
    setTimeout(() => {
      let cart = this.props.cart;
      cart.forEach((item) => {
        if (item.id === arg0) {
          let buttons = document.getElementsByClassName(arg0);
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].removeAttribute("disabled");
          }
          setTimeout(() => {
            for (let i = 0; i < buttons.length; i++) {
              Object.values(item.attr).forEach((val) => {
                if (
                  buttons[i].innerHTML === val ||
                  buttons[i].getAttribute("bg") === val
                ) {
                  buttons[i].setAttribute("disabled", true);
                  buttons[i].setAttribute(
                    "title",
                    "This item with current value is already in cart"
                  );
                }
              });
            }
          }, 10);
        }
      });
    }, 10);
  }
  render() {
    return (
      <div className="cart-container wrapper">
        <h1 className="cart-header">cart</h1>
        {this.getAttribut()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    defaultCurrency: state.defaultCurrency,
    cartsItemsCount: state.cartsItemsCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    change: (item) => {
      dispatch({ type: "CHANGE_ITEMS_PROPERTY", item: item });
    },
    inc: (item) => {
      dispatch({ type: "INCREMENT", item: item });
    },
    dec: (item) => {
      dispatch({ type: "DECREMENT", item: item });
    },
    delete: (item) => {
      dispatch({ type: "DELETE_CART_ITEM", item: item });
    },
    getID: (id) => {
      dispatch({ type: "GET_PRODUCT_ID", id: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
