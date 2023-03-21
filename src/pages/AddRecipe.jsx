import React, { useEffect } from "react";
import RecipeForm from "../components/Forms/RecipeForm";
import { useFirestore } from "../hooks/useFirestore";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const { addDocument, response } = useFirestore("recipes");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const addRecipeHandler = (recipe) => {
    addDocument({ uid: user.uid, ...recipe });
  };

  useEffect(() => {
    if (response.success) {
      navigate("/my-recipes");
    }
  }, [response.success, navigate]);

  return (
    <RecipeForm
      onAddRecipeHandler={addRecipeHandler}
      success={response.success}
      isPending={response.isPending}
    />
  );
};

export default AddRecipe;
