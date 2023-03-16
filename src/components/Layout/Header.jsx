import React, { useContext } from "react";
import Logo from "../../assets/favicon.png";
import { RecipeContext } from "../../context/recipe-context";
import Modal from "../UI/Modal";
import BookMarks from "../BookMarks";
import Form from "../Form";
import { FiEdit } from "react-icons/fi";
import { BsBookmarks } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const HEADER_ELEMENTS = [
  {
    title: "form",
    heading: "add recipe",
    icon: <FiEdit />,
  },
  {
    title: "bookmark",
    heading: "bookmarks",
    icon: <BsBookmarks />,
  },
];

const Header = () => {
  const { showModal, setShowModal, acitveModalItem, activeModalItemHandler } =
    useContext(RecipeContext);
  const { form, bookmark } = acitveModalItem;
  const navigate = useNavigate();

  const activeModalHandler = (item) => {
    activeModalItemHandler(item);
    setShowModal(true);
  };

  const handleClick = () => {
    navigate("/");
  };

  const styles = "self-stretch flex items-center";

  return (
    <>
      <header className="flex  items-center justify-between bg-gray-300 h-[93px] px-2 ">
        <img
          src={Logo}
          alt="Logo"
          onClick={handleClick}
          className="ml-5 w-[50px] h-[50px] cursor-pointer"
        />

        <ul className={`${styles} text-sm md:text-base uppercase`}>
          {HEADER_ELEMENTS?.map((obj) => (
            <li
              key={obj.title}
              className={`${styles} uppercase cursor-pointer hover:bg-gray-500 px-2 sm:px-3 duration-100 gap-2 `}
              onClick={() => activeModalHandler(obj.title)}
            >
              <div className=" text-secondary-500 text-base sm:text-2xl">
                {obj.icon}
              </div>
              <span>{obj.heading}</span>
            </li>
          ))}
        </ul>
      </header>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {bookmark && <BookMarks />}
        {form && <Form />}
      </Modal>
    </>
  );
};

export default Header;
