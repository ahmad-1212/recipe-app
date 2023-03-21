import React from "react";
import ReactDom from "react-dom";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import { OPACITY_VARIANTS } from "../../constants";

const ModalComponent = ({ children, showModal, setShowModal }) => (
  <>
    {showModal && (
      <>
        <Backdrop blur />
        <motion.div
          variants={OPACITY_VARIANTS}
          initial="hidden"
          animate="visible"
          className="w-[97%] md:w-[700px] min-h-[500px] max-h-[500px]   p-4 sm:p-8 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-lg z-50 overflow-auto scrollbar"
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
