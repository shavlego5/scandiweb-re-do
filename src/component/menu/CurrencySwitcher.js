import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { detectCurrencySymbol } from "../../reducers/helper";
import image from "../../images/Vector.png";
import Currencies from "./Currencies";

const getCurrencyTypes = gql`
  {
    currencies
  }
`;

class CurrencySwitcher extends PureComponent {
  constructor() {
    super();
    this.state = {
      vissible: "",
      rotate: "",
    };
  }
  getCurrencyTypes() {
    let data = this.props.data;
    let defaultCurrency = this.props.defaultCurrency;
    if (data.loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className="currency-switcher-container">
          {detectCurrencySymbol(defaultCurrency)}
          <img src={image} alt="arrow" className={this.state.rotate} />
        </div>
      );
    }
  }

  onClickOutside = () => {
    let vissible = document.querySelector(".vissible");
    if (vissible) {
      this.toggleCurrency();
    }
    document.removeEventListener("click", this.onClickOutside);
  };

  toggleCurrency = () => {
    this.state.vissible === ""
      ? this.setState({ vissible: "vissible" })
      : this.setState({ vissible: "" });
    this.state.rotate === ""
      ? this.setState({ rotate: "rotate" })
      : this.setState({ rotate: "" });
  };
  render() {
    return (
      <div
        className="currency-switcher"
        onClick={this.toggleCurrency}
        onMouseLeave={() => {
          let vissible = document.querySelector(".vissible");
          if (vissible) {
            document.addEventListener("click", this.onClickOutside);
          }
        }}
      >
        {this.getCurrencyTypes()}
        <Currencies vissible={this.state.vissible} rotate={this.state.rotate} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    defaultCurrency: state.defaultCurrency,
  };
};

export default graphql(getCurrencyTypes)(
  connect(mapStateToProps)(CurrencySwitcher)
);
