import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
// here data layer actually lives

export const StateProvider = ({ reducer, initialState, children }) => (
  // this is a HOC
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
