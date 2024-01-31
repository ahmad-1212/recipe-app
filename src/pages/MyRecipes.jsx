import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { useCollection } from "../hooks/useCollection";
import RecipeItem from "../components/Recipes/RecipeItem";
import Spinner from "../components/UI/Spinner";
import useAuthContext from "../hooks/useAuthContext";

const MyRecipes = () => {
  const { user } = useAuthContext();
  const { document, error } = useCollection("recipes", ["uid", "==", user.uid]);

  return (
    <>
      {!document && !error && (
        <div>
          <Spinner />
        </div>
      )}
      {error && !document && (
        <h2 className="mt-[10rem] text-secondary-500 text-center text-3xl">
          {error}
        </h2>
      )}
      {!error && document && document.length === 0 && (
        <>
          <h2 className="text-3xl text-center mt-[12rem] text-secondary-500">
            No Recipes Added yet.
          </h2>
          <Link
            to="/add-recipe"
            className="uppercase text-base mt-8 flex justify-center text-secondary-500"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="border-b-[2px] border-secondary-500 flex items-center gap-3"
            >
              <span>Add Recipe</span>
              <BsArrowRight className="text-lg" />
            </motion.div>
          </Link>
        </>
      )}
      {document && document.length > 0 && (
        <>
          <h1 className="my-11 text-secondary-500 text-3xl text-center">
            My Recipes
          </h1>
          <ul className="custom-grid my-6 px-[30px]">
            {document.map((item, index) => (
              <RecipeItem key={index} recipe={item} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default MyRecipes;
