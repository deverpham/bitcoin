import React from "react";
import ReactDOM from "react-dom";
const firebaseModule = require("./modules/firebase");

import "./styles.css";
import store from "./store";
import { connect, Provider } from "react-redux";
class App extends React.Component {
  componentDidMount() {
    this.totalMarket();
  }
  totalMarket() {
    firebaseModule
      .model("market")
      .fetchLikeObject()
      .then(result => console.log(result));
  }
  render() {
    return <div />;
  }
}

const rootElement = document.getElementById("root");
const Root = connect(state => state)(App);
firebaseModule.init().then(
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    rootElement
  )
);
