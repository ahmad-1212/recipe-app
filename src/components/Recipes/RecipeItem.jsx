import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CARD_VARIANTS } from "../../constants";

const RecipeItem = ({ recipe }) => {
  const { id, image_url: url, publisher, title } = recipe;

  // Shorten the title if it is too long
  const recipeTitle = title.length > 20 ? `${title.slice(0, 17)}...` : title;

  return (
    <motion.li
      variants={CARD_VARIANTS}
      initial="hidden"
      animate="visible"
      className="bg-primary-200 p-4 rounded  hover:drop-shadow-xl duration-200"
    >
      <Link to={id} className="flex flex-col">
        <img
          src={url}
          alt={recipeTitle}
          className="w-full h-[190px] object-cover"
        />
        <h4 className="font-bold text-xl mt-4">{recipeTitle}</h4>
        <p className="text-basis">{publisher}</p>
      </Link>
    </motion.li>
  );
};

export default RecipeItem;
