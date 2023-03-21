import React, { useEffect, useReducer, useState } from "react";

// creating empty values which only helps on auto suggestions by vscode when using this context
export const RecipeContext = React.createContext({
  query: "",
  setQuery: () => {},
  showModal: null,
  setShowModal: () => {},
  currentRecipeId: "",
  setCurrentRecipeId: () => {},
  bookmarkState: {},
  bookmarkDispatch: () => {},
});

const initialBookmarkState = {
  items: [],
};

const bookmarkReducer = (state, action) => {
  if (action.type === "INIT") {
    return { ...state, items: [...action.payload] };
  }
  if (action.type === "ADD") {
    localStorage.setItem(
      "bookmark",
      JSON.stringify([...state.items, action.payload])
    );
    return { ...state, items: [...state.items, action.payload] };
  }

  if (action.type === "REMOVE") {
    const itemsCopy = [...state.items];
    const newBookmarkItems = itemsCopy.filter(
      (bookmark) => bookmark.id !== action.payload
    );
    localStorage.setItem("bookmark", newBookmarkItems);
    return { ...state, items: [...newBookmarkItems] };
  }
  return { ...state };
};

const RecipeContextProivder = ({ children }) => {
  const [bookmarkState, bookmarkDispatch] = useReducer(
    bookmarkReducer,
    initialBookmarkState
  );

  const [query, setQuery] = useState();
  const [showModal, setShowModal] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState();
  const [activeModalItem, setActiveModaItem] = useState({
    form: false,
    bookmark: false,
  });

  // Showing the item in modal on the basis of slected one
  const activeModalItemHandler = (item) => {
    const newObject = {};
    Object.keys(activeModalItem).forEach((k) => {
      newObject[k] = false;
    });
    newObject[item] = true;
    setActiveModaItem(newObject);
  };

  useEffect(() => {
    // Taking out all bookmark items if any added
    const items = localStorage.getItem("bookmark");
    if (items) {
      bookmarkDispatch({ type: "INIT", payload: JSON.parse(items) });
    }
  }, []);

  const contextValue = {
    bookmarkState,
    bookmarkDispatch,
    query,
    setQuery,
    showModal,
    setShowModal,
    currentRecipeId,
    setCurrentRecipeId,
    activeModalItem,
    activeModalItemHandler,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContextProivder;
