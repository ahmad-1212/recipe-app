import React from "react";
import { Link } from "react-router-dom";
import useRecipeContext from "../hooks/useRecipeContext";

const BookMarks = ({ setShowSidebar }) => {
  const { bookmarkState, setShowModal, currentRecipeId } = useRecipeContext();
  const bookmarItems = bookmarkState.items;

  const handleClick = () => {
    setShowModal(false);
    setShowSidebar(false);
  };

  return (
    <>
      <h1 className="uppercase text-2xl font-medium my-8 text-secondary-500 text-center">
        Your Bookmark Items
      </h1>
      {!bookmarItems ||
        (bookmarItems.length === 0 && (
          <h4 className=" text-xl text-secondary-500 mt-[10rem] w-full h-full flex items-center justify-center">
            No Bookamrks!
          </h4>
        ))}
      <ul className="flex flex-col gap-1 w-full max-h-[18rem] overflow-auto">
        {bookmarItems &&
          bookmarItems.map((item, i) => (
            <li
              key={i}
              className={`p-5 hover:bg-gray-500 hover:-translate-y-[2px] transition-transform duration-300 ${
                currentRecipeId === item.id ? "bg-gray-500" : "bg-gray-200"
              }`}
            >
              <Link
                to={`/recipes/${item.id}`}
                onClick={handleClick}
                className="flex gap-3"
              >
                <figure className="w-[60px] h-[60px] rounded-full overflow-hidden relative before:w-full before:h-full before:block before:absolute before:top-0 before:left-0 before:bg-gradient-to-br from-primary-500 to-secondary-500 before:opacity-50">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="flex flex-col gap-2">
                  <h2 className="text-base uppercase text-secondary-500">
                    {item.title.length > 20
                      ? item.title.slice(0, 20) + " ..."
                      : item.title}
                  </h2>
                  <p className="font-light text-sm">{item.publisher}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default BookMarks;
