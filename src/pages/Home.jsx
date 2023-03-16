import React, { useContext, useEffect, useState, useRef } from "react";
import Recipes from "../components/Recipes/Recipes";
import { RecipeContext } from "../context/recipe-context";
import { BASE_URL } from "../constants";
import { FiSearch, FiSmile } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";

const API_KEY = process.env.REACT_APP_RECIPE_API_KEY;

const Home = () => {
  const { query, setQuery, setCurrentRecipeId } = useContext(RecipeContext);
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");
  const [recipes, setRecipes] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const inputRef = useRef();

  const changeInputHandler = () => {
    if (inputRef.current.value === 0) return;
    setValue(inputRef.current.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setQuery(value);
    setValue("");
    inputRef.current.blur();
  };

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`${BASE_URL}?search=${query}&key=${API_KEY}`)
      .then((res) => {
        if (!res.ok)
          throw new Error("No Recipe found for your query try something else!");
        return res.json();
      })
      .then((data) => {
        if (data.data.recipes.length === 0) {
          throw new Error("No Recipe found for your query try something else!");
        }
        setLoading(false);
        return setRecipes(data.data.recipes);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [query]);

  useEffect(() => {
    setCurrentRecipeId("");
  }, [setCurrentRecipeId]);

  return (
    <>
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className={`w-11/12 sm:w-9/12 md:w-3/4 lg:w-2/4 m-auto flex relative ease-in duration-200 mt-11 border-2 border-secondary-500 rounded-full ${
          inputActive && "drop-shadow-lg -translate-y-1"
        }`}
      >
        <input
          ref={inputRef}
          placeholder="Search over 10,000,000 recipes..."
          value={value}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          onChange={changeInputHandler}
          className="placeholder:italic placeholder:text-secondary-300 py-3 md:py-4 px-5 rounded-full w-full outline-none  bg-transparent"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-br from-primary-400 to-secondary-500 h-full px-7 md:px-11 rounded-full  uppercase text-white absolute top-2/4 -translate-y-2/4  right-0 flex gap-3 items-center justify-center hover:scale-105 duration-100"
        >
          <FiSearch className="text-white text-2xl mb-1" />
          <span className="text-sm md:text-base"> Search</span>
        </button>
      </form>
      {!recipes && !loading && !error && (
        <div className="mt-[200px] text-secondary-500 flex flex-col gap-3 items-center justify-center">
          <FiSmile className="text-4xl text-secondary-500" />
          <h4 className="text-gray-900 text-2xl text-center">
            Start by searching for a recipe or an ingredient. Have fun!
          </h4>
        </div>
      )}

      {!recipes && !loading && error && (
        <div className="mt-[200px] text-secondary-500 flex flex-col gap-3 items-center justify-center">
          <TbAlertTriangle className="text-5xl text-secondary-500" />
          <span className="text-gray-900 text-base md:text-xl text-center ">
            Something went wrong {error.message}
          </span>
        </div>
      )}

      <Recipes recipes={recipes} Loading={loading} />
    </>
  );
};

export default Home;
