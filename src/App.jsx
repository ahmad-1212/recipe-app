import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RecipeDetail from "./pages/RecipeDetail";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import AddRecipe from "./pages/AddRecipe";
import useAuthContext from "./hooks/useAuthContext";
import MyRecipes from "./pages/MyRecipes";
import MyRecipeDetail from "./pages/MyRecipeDetail";
import Spinner from "./components/UI/Spinner";

const App = () => {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <>
      {!isAuthenticated && (
        <div className="w-screen h-screen justify-center items-center">
          <Spinner />
        </div>
      )}
      {isAuthenticated && (
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/recipes" />} />
            <Route path="/recipes" element={<Home />} />

            <Route
              path="/add-recipe"
              element={user ? <AddRecipe /> : <Navigate to="/" />}
            />
            <Route
              path="/my-recipes"
              element={user ? <MyRecipes /> : <Navigate to="/" />}
            />
            <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
            <Route
              path="/my-recipes/:recipeId"
              element={user ? <MyRecipeDetail /> : <Navigate to="/" />}
            />

            <Route path="*" element={<Notfound />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
