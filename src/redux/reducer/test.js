const initialState = {
  count: 0,
};

export const testReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ACTION":
      return { ...state, count: state.count + payload };
    default:
      return { ...state };
  }
};
