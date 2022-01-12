import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { detectCurrencySymbol } from "../../reducers/helper";

const getCurrenciesTypes = gql`
  {
    currencies
  }
`;

class Currencies extends PureComponent {
  constructor() {
    super();
    this.state = {
      vissible: "",
      rotate: 0,
    };
  }

  changeCurrency = (event) => {
    this.props.changeCurr(event.target.children[1].textContent);
  };

  getCurrencyTypes() {
    let data = this.props.data;
    if (data.loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className={"currency-container " + this.props.vissible}>
          {data.currencies.map((currency) => (
            <div key={currency} onClick={(event) => this.changeCurrency(event)}>
              <p>{detectCurrencySymbol(currency)}</p>
              <p>{currency}</p>
            </div>
          ))}
        </div>
      );
    }
  }

  render() {
    return <>{this.getCurrencyTypes()}</>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurr: (currency) => {
      dispatch({ type: "CHANGE_CURRENCY", currency });
    },
  };
};

export default graphql(getCurrenciesTypes)(
  connect(null, mapDispatchToProps)(Currencies)
);
