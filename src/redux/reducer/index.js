import { combineReducers } from "redux";
import { testReducer } from "./test";

const reducer = {
  test: testReducer,
};

export default combineReducers(reducer);
