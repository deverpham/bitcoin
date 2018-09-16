import { createStore } from "redux";
const reducer = function(
  defaultState = {
    movies: []
  },
  action
) {
  switch (action.type) {
    case "FETCH_LINK": {
      return {
        ...defaultState,
        movies: action.payloads.movies
      };
    }
    default: {
      return defaultState;
    }
  }
};
const store = createStore(reducer);
export default store;
