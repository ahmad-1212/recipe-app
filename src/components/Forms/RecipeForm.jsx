import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { FiUploadCloud } from "react-icons/fi";
import { recipeSchema } from "../../schemas";

const RecipeForm = ({ onAddRecipeHandler, success, isPending }) => {
  const ingredientsInputRef = useRef();
  const [ingError, setIngError] = useState(null);
  const [ingArr, setIngArr] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // Getting all data on submitting form
  const onSubmit = () => {
    if (ingArr.length < 2) {
      setIngError("There must be at least two Ingredients");
      return;
    }

    // Passing Recipe data to parent component
    onAddRecipeHandler({
      title: values.title,
      publisher: values.publisher,
      file: imageFile,
      cooking_time: values.prep,
      ingredients: [...ingArr],
      servings: values.servings,
    });
  };

  // using Formik for validation
  const {
    values,
    errors,
    resetForm,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      publisher: "",
      prep: 0,
      servings: 0,
    },
    validationSchema: recipeSchema,
    onSubmit,
  });

  // Reseting the form
  useEffect(() => {
    if (success) {
      resetForm();
      setIngArr([]);
    }
  }, [success, resetForm]);

  // Custom Validation: Ingredients input validation onChange
  const handleChangeIngValue = () => {
    const value = ingredientsInputRef.current.value;

    // validation
    if (value.split(",").length === 3) {
      setIngError(null);
      if (value.split(",")[2].length < 5) {
        setIngError("Description must be 5 characters long");
      }
    }
  };

  //  Custom Validation: Input validation onBlur
  const handleIngBlur = () => {
    const value = ingredientsInputRef.current.value;

    // Conditions
    if (value.length === 0) {
      return;
    }
    if (value.split(",").length !== 3) {
      setIngError("Format must be Quantity, Unit, Description");
      return;
    }

    setIngError(null);
  };

  // Adding ing item to ing Obj
  const addItem = () => {
    const ingValue = ingredientsInputRef.current.value;
    if (ingError) return;
    if (ingValue.length === 0) {
      setIngError("Fill the Input with required data");
      return;
    }
    const value = ingValue.split(",");
    const newObj = {
      quantity: value[0],
      unit: value[1],
      description: value[2],
      id: Math.random() * 1000000,
    };

    setIngArr((prev) => [...prev, { ...newObj }]);
    ingredientsInputRef.current.value = "";
  };

  // Delete Ing item

  const deletItem = (id) => {
    const newArr = [...ingArr];
    const updatedArr = newArr.filter((item) => item.id !== id);
    setIngArr(updatedArr);
  };

  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () =>
      window.removeEventListener("beforeunload", beforeUnloadHandler);
  }, []);

  // Repeated styles
  const styles = "flex flex-col gap-2 mb-3 text-base ";
  const errorStyles = "text-sm text-[#ff8585d8]";
  const inputStyles =
    "border-[1px] text-lg border-gray-700 rounded py-2 px-2 outline-none focus:bg-primary-100 focus:border-secondary-500 placeholder:text-[#c8c4c3] placeholder:font-light font-medium ";
  return (
    <>
      <h3 className="uppercase text-secondary-500 font-bold text-center text-2xl mt-8">
        Add recipe
      </h3>

      <form
        onSubmit={handleSubmit}
        className="form mt-[40px] w-5/6 sm:w-4/6 md:w-3/6 flex flex-col gap-4 m-auto"
      >
        <div className={styles}>
          <label htmlFor="title">Title</label>
          <input
            value={values.title}
            type="text"
            id="title"
            placeholder="Title"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputStyles} ${
              errors.title && touched.title ? "input-error" : ""
            }`}
          />
          {errors.title && touched.title && (
            <p className={errorStyles}>{errors.title}</p>
          )}
        </div>
        <div className={styles}>
          <label htmlFor="image-url">Image</label>
          <input
            type="file"
            id="image"
            placeholder="Choose an Image"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            className={inputStyles}
          />
          {errors.url && touched.url && (
            <p className={errorStyles}>{errors.url}</p>
          )}
        </div>
        <div className={styles}>
          <label htmlFor="publisher">Publisher</label>
          <input
            value={values.publisher}
            type="text"
            id="publisher"
            placeholder="Publisher"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputStyles} ${
              errors.publisher && touched.publisher ? "input-error" : ""
            }`}
          />
          {errors.publisher && touched.publisher && (
            <p className={errorStyles}>{errors.publisher}</p>
          )}
        </div>
        <div className={styles}>
          <label htmlFor="prep">Prep Time</label>
          <input
            value={values.prep}
            type="number"
            id="prep"
            placeholder="Preparation Time"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputStyles} ${
              errors.prep && touched.prep ? "input-error" : ""
            }`}
          />
          {errors.prep && touched.prep && (
            <p className={errorStyles}>{errors.prep}</p>
          )}
        </div>
        <div className={styles}>
          <label htmlFor="servings">Servings</label>
          <input
            value={values.servings}
            type="number"
            id="servings"
            placeholder="Servings"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputStyles} ${
              errors.servings && touched.servings ? "input-error" : ""
            }`}
          />
          {errors.servings && touched.servings && (
            <p className={errorStyles}>{errors.servings}</p>
          )}
        </div>

        <div className={styles}>
          <label>Ingredients</label>
          <div className="flex gap-4">
            <input
              ref={ingredientsInputRef}
              onChange={handleChangeIngValue}
              onBlur={handleIngBlur}
              type="text"
              placeholder="Format: Quantity, Unit, Description"
              className={`${inputStyles} w-5/6 ${ingError && "input-error"}`}
            />
            <button
              onClick={addItem}
              type="button"
              className="w-1/6 bg-secondary-500 text-white rounded"
            >
              Add
            </button>
          </div>
          {ingError && <p className={errorStyles}>{ingError}</p>}
          {ingArr?.map((ing, i) => (
            <div
              key={i}
              className="flex justify-between py-1 rounded px-3 bg-gray-200"
            >
              <div className="normal-case text-gray-700">
                <span className="uppercase font-bold">Ingredient</span> {i + 1}:
                &nbsp; {ing.quantity}, {ing.unit}, {ing.description}
              </div>
              <div
                className="cursor-pointer text-xl"
                onClick={() => deletItem(ing.id)}
              >
                &times;
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={onSubmit}
            disabled={isPending}
            className="flex items-center justify-center  rounded-md px-11 py-3 mb-1 text-white gap-3 bg-gradient-to-br from-primary-500 to-secondary-500 w-full text-center  hover:scale-105 disabled:hover:scale-100 duration-200 disabled:cursor-not-allowed disabled:opacity-80"
          >
            <FiUploadCloud className="text-xl" />{" "}
            {isPending ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
