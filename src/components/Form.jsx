import React from "react";
import { FiUploadCloud } from "react-icons/fi";

const Form = () => {
  const styles = "flex flex-col gap-2 mb-3 uppercase font-medium text-xs ";
  const inputStyles =
    "border-[1px] rounded border-gray-700 py-2 px-2 outline-none focus:bg-primary-100 focus:border-secondary-500 placeholder:text-[#c8c4c3] placeholder:font-light ";
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 sm:flex-row gap-8  px-8 mt-[40px] w-full max-h-[22rem] overflow-auto">
      <div className="basis-2/4 grid grid-cols-1 gap-y-4">
        <h1 className="uppercase text-xl mb-3 text-secondary-500 font-bold ">
          recipe data
        </h1>
        <div className={styles}>
          {" "}
          <label htmlFor="title">Title</label>
          <input
            className={inputStyles}
            type="text"
            id="title"
            placeholder="Title"
          />
        </div>

        <div className={styles}>
          {" "}
          <label htmlFor="url">URL</label>
          <input
            className={inputStyles}
            type="text"
            id="url"
            placeholder="URL"
          />
        </div>
        <div className={styles}>
          <label htmlFor="image-url">Image URL</label>
          <input
            className={inputStyles}
            type="text"
            id="image-url"
            placeholder="Image URL"
          />
        </div>
        <div className={styles}>
          {" "}
          <label htmlFor="publisher">Publisher</label>
          <input
            className={inputStyles}
            type="text"
            id="publisher"
            placeholder="Publisher"
          />
        </div>
        <div className={styles}>
          <label htmlFor="prep-time">Prep time</label>
          <input
            className={inputStyles}
            type="number"
            id="prep-time"
            placeholder="Preparation Time"
          />
        </div>
        <div className={styles}>
          <label htmlFor="servings">Servings</label>
          <input
            className={inputStyles}
            type="number"
            id="servings"
            placeholder="Servings"
          />
        </div>
      </div>
      <div className="basis-2/4 grid grid-cols-1 gap-y-4">
        <h1 className="uppercase text-xl mb-3 text-secondary-500 font-bold ">
          ingredients
        </h1>
        <div className={styles}>
          {" "}
          <label htmlFor="title">ingredient 1</label>
          <input
            className={inputStyles}
            type="text"
            id="title"
            placeholder="Format: 'Quantity, Unit, Description"
          />
        </div>

        <div className={styles}>
          {" "}
          <label htmlFor="url">ingredient 2</label>
          <input
            className={inputStyles}
            type="text"
            id="url"
            placeholder="Format: 'Quantity, Unit, Description"
          />
        </div>
        <div className={styles}>
          <label htmlFor="image-url">ingredient 3</label>
          <input
            className={inputStyles}
            type="text"
            id="image-url"
            placeholder="Format: 'Quantity, Unit, Description"
          />
        </div>
        <div className={styles}>
          {" "}
          <label htmlFor="publisher">ingredient 5</label>
          <input
            className={inputStyles}
            type="text"
            id="publisher"
            placeholder="Format: 'Quantity, Unit, Description"
          />
        </div>
        <div className={styles}>
          <label htmlFor="prep-time">ingredient 6</label>
          <input
            className={inputStyles}
            type="text"
            id="prep-time"
            placeholder="Format: 'Quantity, Unit, Description"
          />
        </div>
        <div className={styles}>
          <label htmlFor="servings">Servings</label>
          <input
            className={inputStyles}
            type="text"
            id="servings"
            placeholder="Format: 'Quantity, Unit, Description"
          />
        </div>
      </div>
      <button
        type="button"
        className="uppercase flex items-center gap-3 bg-gradient-to-br from-primary-500 to-secondary-500 col-span-full text-white py-3 px-11 justify-self-center rounded-full hover:scale-105 duration-200"
      >
        <FiUploadCloud className="text-xl text-white mb-1" />
        <span>Upload</span>
      </button>
      <p className="text-[#ff0000] col-span-full text-center">
        The Recipe can't be uploaded because the{" "}
        <span className="font-bold uppercase">backend</span> of this App is not
        coded yet!
      </p>
    </form>
  );
};

export default Form;
