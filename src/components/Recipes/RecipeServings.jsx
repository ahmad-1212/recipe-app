import React, { useContext, useState } from "react";
import { RecipeContext } from "../../context/recipe-context";
import { motion } from "framer-motion";
import { BiTimeFive } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";

const svgVariants = {
  hidden: {
    rotate: 0,
    scale: 0,
  },
  visible: {
    rotateY: 360,
    scale: [1, 1.5, 1],
    transition: {
      duration: 0.8,
    },
  },
};

const RecipeServings = ({
  servings,
  setServings,
  cookingTime,
  onHandleBookmark,
  id,
}) => {
  const { bookmarItems } = useContext(RecipeContext);
  const [isAnimate, setIsAnimate] = useState(false);
  const isBookmarked =
    bookmarItems && bookmarItems.some((item) => item.id === id);

  const handleServings = (decrease = false) => {
    if (decrease) {
      if (servings === 1) return;
      setServings((servings) => servings - 1);
    } else {
      setServings((servings) => servings + 1);
    }
  };

  return (
    <div className="py-[4rem] mt-8 px-8 max-w-[100%] lg:max-w-[70%] mx-auto">
      <ul className="flex flex-wrap text-lg">
        <li className=" font-light flex gap-2  items-center basis-full order-last sm:order-none sm:flex-none">
          <BiTimeFive className="text-3xl text-secondary-500 -ml-[6px] sm:ml-0" />
          <p>
            <span className="font-bold">{cookingTime}</span>{" "}
            <span>Minutes</span>
          </p>
        </li>
        <li className="ml-0 sm:ml-[50px] font-light gap-3 flex items-center">
          <FiUsers className="text-3xl text-secondary-500" />
          <p className="flex gap-2 items-center">
            <span className="font-bold">{servings}</span> <span>Servings</span>
          </p>
          <div className="flex gap-1 items-center">
            <IoIosRemoveCircleOutline
              className="text-secondary-500 text-2xl cursor-pointer hover:-translate-y-[1px] duration-200"
              onClick={() => handleServings(true)}
            />
            <IoIosAddCircleOutline
              className="text-secondary-500 text-2xl cursor-pointer hover:-translate-y-[1px] duration-200"
              onClick={() => handleServings(false)}
            />
          </div>
        </li>
        <li className="ml-auto">
          <button
            type="button"
            onClick={() => {
              setIsAnimate(true);
              onHandleBookmark();
            }}
            className="bg-gradient-to-br from-primary-500 to-secondary-500 w-[45px] h-[45px] rounded-full flex items-center justify-center hover:scale-105 duration-300"
          >
            {!isBookmarked && <FiBookmark className="text-[27px] text-white" />}

            {isBookmarked && (
              <motion.svg
                variants={isAnimate && svgVariants}
                initial="hidden"
                animate="visible"
                className="w-[27px] h-[27px] fill-white"
                id="icon-bookmark-fill"
                viewBox="0 0 24 24"
              >
                <polygon points="18.419 21.814, 19.000 22.000, 20.000 21.000, 20.000 5.000, 19.121 2.879, 17.000 2.000, 7.000 2.000, 4.879 2.879, 4.000 5.000, 4.000 21.000, 4.186 21.581, 5.581 21.813, 12.000 17.229" />
              </motion.svg>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RecipeServings;
