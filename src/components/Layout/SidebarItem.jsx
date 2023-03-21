import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import useRecipeContext from "../../hooks/useRecipeContext";
import { SIDEBAR_ITEM_VARIANTS } from "../../constants";

const SidebarItem = ({ navItem, setShowSidebar, user }) => {
  const { title, link, type, icon, auth, isModal } = navItem;
  const { setShowModal, activeModalItemHandler } = useRecipeContext();

  const handleModal = (item) => {
    activeModalItemHandler(item);
    setShowModal(true);
  };

  if (type === "modal") {
    return (
      <motion.li
        variants={SIDEBAR_ITEM_VARIANTS}
        whileHover={{ scale: 1.1, originX: 0 }}
        onClick={() => handleModal("bookmark")}
        className="ml-2 py-2 px-3 cursor-pointer flex text-white fill-white uppercase gap-2"
      >
        <span>{icon}</span>
        <span>{title}</span>
      </motion.li>
    );
  }

  if (auth && !user && isModal) {
    return (
      <motion.li
        variants={SIDEBAR_ITEM_VARIANTS}
        whileHover={{ scale: 1.1, originX: 0 }}
        onClick={() => handleModal("form")}
        className="ml-2 py-2 px-3 cursor-pointer flex text-white fill-white uppercase gap-2"
      >
        <span>{icon}</span>
        <span>{title}</span>
      </motion.li>
    );
  }

  if (auth && !user) {
    return;
  }

  return (
    <motion.li
      variants={SIDEBAR_ITEM_VARIANTS}
      whileHover={{ scale: 1.1, originX: 0 }}
      onClick={() => setShowSidebar(false)}
      className="ml-2 py-2 px-3 cursor-pointer "
    >
      <NavLink
        to={link}
        className="flex text-white fill-white uppercase gap-2 "
      >
        <span>{icon}</span>
        <span>{title}</span>
      </NavLink>
    </motion.li>
  );
};

export default SidebarItem;
