import { actionTypes } from "redux/action";

export const test = (payload) => {
  return {
    type: actionTypes.TEST,
    payload: payload,
  };
};
