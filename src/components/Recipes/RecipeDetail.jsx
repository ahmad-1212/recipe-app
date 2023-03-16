import React, { useContext, useEffect, useState } from "react";
import RecipeServings from "./RecipeServings";
import RecipeIngredient from "./RecipeIngredient";
import { RecipeContext } from "../../context/recipe-context";
import { HiOutlineArrowRight } from "react-icons/hi";

const RecipeDetail = ({ recipe }) => {
  const {
    title,
    id,
    image_url: url,
    cooking_time: cookingTime,
    servings: initialServings,
    ingredients,
    publisher,
    source_url: direction,
  } = recipe;
  const [servings, setServings] = useState(initialServings);
  const { bookmarkHandler, setCurrentRecipeId } = useContext(RecipeContext);

  const handleBookmark = () => {
    bookmarkHandler({ url, id, publisher, title });
  };

  useEffect(() => {
    setCurrentRecipeId(id);
  }, [id,setCurrentRecipeId]);

  return (
    <section className="bg-gray-400 ">
      <figure className="relative before:w-full before:h-full before:block before:absolute before:top-0 before:left-0 before:bg-gradient-to-br from-primary-500 to-secondary-500 before:opacity-60">
        <img
          src={url}
          alt={title}
          className="object-cover w-full md:h-[30rem] h-[20rem] sm:h-[22rem] "
        />
        <h1 className="title">
          <span className=" ">{title && title}</span>
        </h1>
      </figure>
      <RecipeServings
        servings={+servings}
        setServings={setServings}
        cookingTime={cookingTime}
        onHandleBookmark={handleBookmark}
        id={id}
      />

      {ingredients && (
        <div className="bg-gray-600">
          <h1 className="pt-[3.5rem] text-center font-medium uppercase text-2xl text-secondary-500">
            Recipe Ingredients
          </h1>
          <ul className="pt-8 pb-11 px-8 lg:px-0 max-w-[100%] lg:max-w-[65%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 justfiy-center">
            {ingredients.map((ing, i) => (
              <RecipeIngredient
                key={i}
                ingredient={ing}
                initialServings={initialServings}
                servings={servings}
              />
            ))}
          </ul>
        </div>
      )}
      <div className="py-[4.5rem] w-[90%] md:w-[70%] m-auto flex flex-col items-center gap-9">
        <h2 className="text-2xl uppercase text-secondary-500">
          how to cook it
        </h2>
        <p className=" text-gray-800 font-light text-[1.2rem] text-center">
          This recipe was carefully designed and tested by{" "}
          <span className="font-bold">{publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          href={direction}
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white uppercase flex items-center gap-2 py-4 px-8 rounded-full text-base hover:scale-105 duration-200"
        >
          <span>directions</span>
          <HiOutlineArrowRight className="text-base text-white" />
        </a>
      </div>
    </section>
  );
};

export default RecipeDetail;
