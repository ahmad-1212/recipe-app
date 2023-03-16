import React, { useEffect, useState } from "react";

export const RecipeContext = React.createContext({
  query: "",
  setQuery: () => {},
  showModal: null,
  setShowModal: () => {},
  bookmarItems: [],
  setBookmarkItems: () => {},
  currentRecipeId: "",
  setCurrentRecipeId: () => {},
});

export const RecipeContextProivder = ({ children }) => {
  const [query, setQuery] = useState();
  const [showModal, setShowModal] = useState(false);
  const [bookmarItems, setBookmarkItems] = useState([]);
  const [currentRecipeId, setCurrentRecipeId] = useState();
  const [acitveModalItem, setActiveModaItem] = useState({
    form: false,
    bookmark: false,
  });

  const activeModalItemHandler = (item) => {
    const newObject = {};
    Object.keys(acitveModalItem).forEach((k) => {
      newObject[k] = false;
    });
    newObject[item] = true;
    setActiveModaItem(newObject);
  };

  const bookmarkHandler = (item) => {
    if (bookmarItems.length > 0) {
      const isBookmarked = bookmarItems.find(
        (bookmark) => bookmark.id === item.id
      );
      if (!isBookmarked) {
        setBookmarkItems((prev) => [...prev, item]);
        return;
      }
      if (isBookmarked) {
        const bookmarItemsCopy = [...bookmarItems];
        const newBookmarkItems = bookmarItemsCopy.filter(
          (bookmark) => bookmark.id !== isBookmarked.id
        );
        setBookmarkItems(newBookmarkItems);
      }
    } else {
      setBookmarkItems((prev) => [...prev, item]);
    }
  };

  useEffect(() => {
    if (bookmarItems.length > 0)
      localStorage.setItem("bookmark", JSON.stringify(bookmarItems));
  }, [bookmarItems]);

  useEffect(() => {
    const item = localStorage.getItem("bookmark");
    if (item) {
      setBookmarkItems(JSON.parse(item));
    }
  }, []);

  const contextValue = {
    query,
    setQuery,
    showModal,
    setShowModal,
    bookmarItems,
    bookmarkHandler,
    currentRecipeId,
    setCurrentRecipeId,
    acitveModalItem,
    activeModalItemHandler,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};
