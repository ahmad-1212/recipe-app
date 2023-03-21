import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Backdrop from "../UI/Backdrop";
import SidebarItem from "./SidebarItem";
import { NAV_ITEMS } from "../../constants";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import useAuthContext from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import useRecipeContext from "../../hooks/useRecipeContext";
import { SIDEBAR_VARIANTS } from "../../constants";
import { SIDEBAR_ITEM_VARIANTS } from "../../constants";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { setShowModal, activeModalItemHandler } = useRecipeContext();

  const loginHandler = () => {
    setShowSidebar(false);
    setShowModal(true);
    activeModalItemHandler("form");
  };

  const logoutHandler = () => {
    logout();
    setShowSidebar(false);
  };

  return (
    <>
      {" "}
      {showSidebar && <Backdrop handleClick={() => setShowSidebar(false)} />}
      <AnimatePresence>
        {showSidebar && (
          <motion.aside
            className="fixed z-30 top-0 right-0 w-[70%] sm:w-[40%] h-screen bg-gradient-to-br from-secondary-500 to-primary-500"
            initial={{ x: "100vw" }}
            animate={{ x: 0, transition: { duration: 0.4 } }}
            exit={{ x: "100vw" }}
          >
            {" "}
            <div
              onClick={() => setShowSidebar(false)}
              className="absolute cursor-pointer right-[1rem] top-[1rem] text-4xl text-white hover:scale-105 duration-200"
            >
              &times;
            </div>
            <nav>
              <motion.ul
                variants={SIDEBAR_VARIANTS}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-5 text-2xl mt-[4.5rem]"
              >
                {NAV_ITEMS.map((navItem, i) => (
                  <SidebarItem
                    key={i}
                    navItem={navItem}
                    setShowSidebar={setShowSidebar}
                    user={user}
                  />
                ))}
                {user && (
                  <motion.li
                    onClick={logoutHandler}
                    variants={SIDEBAR_ITEM_VARIANTS}
                    whileHover={{ scale: 1.1, originX: 0 }}
                    className="ml-2 py-2 px-3 cursor-pointer flex text-white fill-white uppercase gap-2"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </motion.li>
                )}
                {!user && (
                  <motion.li
                    variants={SIDEBAR_ITEM_VARIANTS}
                    onClick={loginHandler}
                    whileHover={{ scale: 1.1, originX: 0 }}
                    className="ml-2 py-2 px-3 cursor-pointer flex text-white fill-white uppercase gap-2"
                  >
                    <FiLogIn />
                    <span>Login</span>
                  </motion.li>
                )}
              </motion.ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
