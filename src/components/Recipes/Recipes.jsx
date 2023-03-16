import React, { useContext } from "react";
import { RecipeContext } from "../../context/recipe-context";
import Spinner from "../UI/Spinner";
import RecipeItem from "./RecipeItem";

const Recipes = ({ recipes, Loading }) => {
  const { query } = useContext(RecipeContext);

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
