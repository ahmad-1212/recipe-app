import React, { useEffect, useState } from "react";
import RecipeDetail from "../components/Recipes/RecipeDetail";
import { useParams } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import { TbAlertTriangle } from "react-icons/tb";

const API_KEY = process.env.REACT_APP_RECIPE_API_KEY;
const URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";

const Detail = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const params = useParams();
  const { recipeId } = params;

  useEffect(() => {
    setLoading(true);
    fetch(`${URL}${recipeId}?key=${API_KEY}`)
      .then((res) => {
        if (!res.ok) throw new Error("Something Went Wrong Please try again!");
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setData(data.data.recipe);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [recipeId]);

  return (
    <>
      {loading && !error && <Spinner />}
      {!loading && data && !error && <RecipeDetail recipe={data} />}
      {!loading && !data && error && (
        <h1 className="flex justify-center text-xl flex-col items-center gap-2 mt-[10rem] ">
          {" "}
          <TbAlertTriangle className="text-5xl text-secondary-500" />
          <span>{error.message}</span>
        </h1>
      )}
    </>
  );
};

export default Detail;
