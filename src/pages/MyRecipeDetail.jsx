import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import RecipeDetail from "../components/Recipes/RecipeDetail";
import Spinner from "../components/UI/Spinner";

const MyRecipeDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const param = useParams();
  const { recipeId } = param;

  useEffect(() => {
    // Get single recipe from firestore
    const getDocument = async (collectionName, documentId) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLoading(false);
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setData(null);
          setLoading(false);
          setError("No Recipe found!");
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getDocument("recipes", recipeId);
  }, [recipeId]);
  return (
    <>
      {!data && !error && loading && (
        <div>
          <Spinner />
        </div>
      )}
      {!data && !loading && error && (
        <h2 className="mt-[10rem] text-secondary-500 text-3xl flex justify-center ">
          {error}
        </h2>
      )}

      {data && !error && !loading && (
        <RecipeDetail recipe={data} myRecipe="true" />
      )}
    </>
  );
};

export default MyRecipeDetail;
