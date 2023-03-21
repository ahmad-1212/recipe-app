import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import RecipeContextProivder from "./context/recipe-context";
import AuthContextProvider from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      <RecipeContextProivder>
        <AuthContextProvider>
          {" "}
          <App />
        </AuthContextProvider>
      </RecipeContextProivder>
    </BrowserRouter>
  </React.StrictMode>
);
