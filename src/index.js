import React from "react";
import ReactDOM from "react-dom";
const firebaseModule = require("./modules/firebase");
import "./styles.css";
import store from "./store";
import { connect, Provider } from "react-redux";
import { Movie } from "./components/movie.component";
class App extends React.Component {
  getListVideo() {
    firebaseModule
      .model("movies")
      .fetch()
      .then(result => {
        this.props.dispatch({
          type: "FETCH_LINK",
          payloads: {
            movies: result
          }
        });
      });
  }
  componentDidMount() {
    this.getListVideo();
  }
  render() {
    return (
      <div>
        {this.props.movies.map((movie, key) => (
          <Movie key={key} movie={movie} />
        ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
const Root = connect(state => state)(App);
firebaseModule.init().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    rootElement
  );
});
