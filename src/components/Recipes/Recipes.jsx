import React from "react";
import useRecipeContext from "../../hooks/useRecipeContext";
import Spinner from "../UI/Spinner";
import RecipeItem from "./RecipeItem";

const Recipes = ({ recipes, Loading }) => {
  const recipeContext = useRecipeContext();
  const { query } = recipeContext;

  return (
    <section>
      {Loading && <Spinner />}
      {!Loading && recipes && (
        <>
          <h2 className="text-xl md:text-3xl mt-8 text-center">
            Search Results for "
            <span className="font-bold text-secondary-500">{query}</span>"
          </h2>
          <ul className="custom-grid my-6 px-[30px]">
            {recipes.map((item, index) => (
              <RecipeItem key={index} recipe={item} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Recipes;
