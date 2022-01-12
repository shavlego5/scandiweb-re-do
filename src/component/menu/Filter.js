import React, { PureComponent } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const getFilterProperties = gql`
  {
    categories {
      name
    }
  }
`;

class Filter extends PureComponent {
  filterProducts = (event) => {
    this.props.fillter(event.target.innerHTML.replace("<span></span>", ""));
    let parent = event.target.parentNode.children;
    for (let i = 0; i < parent.length; i++) {
      parent[i].classList.remove("active");
    }
    event.target.classList.add("active");
  };
  displayFilterProperties() {
    let data = this.props.data;
    if (data.loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <Link to="/">
          <button
            type="button"
            className="filter-button active"
            onClick={this.filterProducts}
          >
            all
            <span></span>
          </button>
          {data.categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className="filter-button"
              onClick={this.filterProducts}
            >
              {category.name}
              <span></span>
            </button>
          ))}
        </Link>
      );
    }
  }
  render() {
    return <div className="filter">{this.displayFilterProperties()}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fillter: (name) => {
      dispatch({ type: "FILTER_CATEGORY", name: name });
    },
  };
};

export default graphql(getFilterProperties)(
  connect(null, mapDispatchToProps)(Filter)
);
