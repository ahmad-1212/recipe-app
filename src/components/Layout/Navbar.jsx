import React from "react";
import NavItem from "./NavItem";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "../../constants";

const Navbar = ({ user, onLogin, onLogout }) => {
  const styles = "self-stretch flex items-center";

  return (
    <nav className={styles}>
      <ul className={`${styles}`}>
        {NAV_ITEMS?.map((item) => (
          <NavItem key={item.title} navItem={item} user={user} />
        ))}
      </ul>
      {!user && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="button"
          onClick={onLogin}
          className="py-3 px-8 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full ml-4 mr-2"
        >
          Login
        </motion.button>
      )}
      {user && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="button"
          onClick={onLogout}
          className="py-3 px-8 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full ml-4 mr-2"
        >
          Logout
        </motion.button>
      )}
    </nav>
  );
};

export default Navbar;
