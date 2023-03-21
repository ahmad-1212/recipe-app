import { useContext } from "react";
import { RecipeContext } from "../context/recipe-context";

const useRecipeContext = () => {
  const context = useContext(RecipeContext);

  return context;
};

export default useRecipeContext;
