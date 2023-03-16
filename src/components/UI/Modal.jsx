import React from "react";
import ReactDom from "react-dom";
import { motion } from "framer-motion";

const modalVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const ModalComponent = ({ children, showModal, setShowModal }) => (
  <>
    {showModal && (
      <>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          onClick={() => setShowModal(false)}
          className="w-full h-full fixed top-0 left-0 bg-[#000]/[0.2]  backdrop-blur-sm z-20 cursor-pointer"
        ></motion.div>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          className="w-[97%] md:w-[700px] min-h-[480px] max-h-[480px]   p-4 sm:p-8 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-lg z-30 overflow-auto scrollbar"
        >
          <div
            className="absolute top-[0.5rem] right-[1rem]  cursor-pointer font-light text-4xl"
            onClick={() => setShowModal(false)}
          >
            &times;
          </div>
          <div className="mt-5">{children}</div>
        </motion.div>
      </>
    )}
  </>
);

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>{ReactDom.createPortal(<ModalComponent {...props} />, portalElement)}</>
  );
};

export default Modal;
