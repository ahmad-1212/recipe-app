import React from "react";
import { motion } from "framer-motion";
import { OPACITY_VARIANTS } from "../../constants";

const Backdrop = ({ white, blur, handleClick }) => {
  return (
    <motion.div
      onClick={handleClick}
      variants={OPACITY_VARIANTS}
      initial="hidden"
      animate="visible"
      className={`w-full h-full fixed top-0 left-0 ${
        white ? "bg-white/[0.4]" : "bg-[#000]/[0.2] "
      } ${blur && "backdrop-blur-sm"} z-20`}
    ></motion.div>
  );
};

export default Backdrop;
