import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: {
    y: -30,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const RecipeItem = ({ recipe }) => {
  const { id, image_url: url, publisher, title } = recipe;

  const recipeTitle = title.length > 20 ? `${title.slice(0, 17)}...` : title;

  return (
    <motion.li
      variants={cardVariant}
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
