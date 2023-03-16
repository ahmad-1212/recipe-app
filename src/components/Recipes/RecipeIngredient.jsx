import React from "react";
import { Fraction } from "fractional";
import { FiCheck } from "react-icons/fi";

const RecipeIngredient = ({ ingredient, initialServings, servings }) => {
  const { quantity, description, unit } = ingredient;

  // Updating recipe quantity when servings increases
  const recipeQuantity = (quantity * servings) / initialServings;

  // Removing any Unit in description
  const recipeDescription = description
    .split(" ")
    .map((item) => {
      if (Number.parseFloat(item)) {
        return '';
      }
      return item;
    })
    .join(" ").trim();

  return (
    <li className="flex items-start gap-3 text-[1.1rem] font-light justify-center md:justify-start">
      <div>
        {" "}
        <FiCheck className="text-xl text-secondary-500 mt-1" />
      </div>
      <p className="flex items-start gap-1">
        <span className="min-w-fit ">
          {recipeQuantity === 0 ? "" : new Fraction(recipeQuantity).toString()}
        </span>
        <span>{unit}</span>
        <span>{recipeDescription}</span>
      </p>
    </li>
  );
};

export default RecipeIngredient;
