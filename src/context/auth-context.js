import React, { useReducer, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = React.createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "IS_AUTHENTICATED":
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      return { ...state };
  }
};

const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Checking when user is already logged in or not if page is reloaded of come back to the page after certain amount of time
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatchAuth({ type: "IS_AUTHENTICATED", payload: user });
      unsub();
    });
  }, [dispatchAuth]);

  return (
    <AuthContext.Provider value={{ ...authState, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
