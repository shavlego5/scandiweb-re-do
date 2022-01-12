import "./App.css";
import React, { PureComponent } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./component/Menu";
import ProductList from "./component/ProductList";
import Details from "./component/Details";
import Cart from "./component/Cart";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <BrowserRouter>
            <Menu />
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route path="/details" component={Details} />
              <Route path="/cart" component={Cart} />
            </Switch>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
