import { createStore } from "redux";
const reducer = function(defaultState = {}, action) {
  switch (action.type) {
    default: {
      return defaultState;
    }
  }
};
const store = createStore(reducer);
export default store;
