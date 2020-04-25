import { combineReducers } from "redux";

const user = (state = { authenticated: null }, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  user,
});
