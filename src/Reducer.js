export const initialState = {
  user: null,
  //   ***** need to change this to null for autentication
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

// when an action gets dispatch into the data layer , then it will come to reducer
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
      break;

    default:
      return state;
      break;
  }
};

export default reducer;
