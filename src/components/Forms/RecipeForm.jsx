import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { FiUploadCloud } from "react-icons/fi";
import { recipeSchema } from "../../schemas";

const RecipeForm = ({ onAddRecipeHandler, success, isPending }) => {
  const urlInputRef = useRef();
  const [urlValue, setURLValue] = useState("");
  const ingredientsInputRef = useRef();
  const [ingValue, setIngValue] = useState("");
  const [ingError, setIngError] = useState(null);
  const [ingObj, setIngObj] = useState([]);

  // Getting all data on submitting form
  const onSubmit = () => {
    if (ingObj.length < 2) {
      setIngError("There must be at least two Ingredients");
      return;
    }

    // Passing Recipe data to parent component
    onAddRecipeHandler({
      title: values.title,
      publisher: values.publisher,
      image_url: urlValue,
      cooking_time: values.prep,
      ingredients: [...ingObj],
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

  useEffect(() => {
    if (success) {
      resetForm();
      setURLValue("");
      setIngObj([]);
    }
  }, [success, resetForm]);

  // Custom Validation: Ingredients input validation onChange
  const handleChangeIngValue = () => {
    const value = ingredientsInputRef.current.value;
    setIngValue(value);

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
    setIngValue(value);

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
    };

    setIngObj((prev) => [...prev, { ...newObj }]);
    setIngValue("");
  };

  // Setting url value when changes
  const handleURLChange = () => {
    setURLValue(urlInputRef.current.value);
  };

  // Repeated styles
  const styles = "flex flex-col gap-2 mb-3 text-base ";
  const errorStyles = "text-sm text-[#ff8585d8]";
  const inputStyles =
    "border-[1px] text-lg border-gray-700 rounded py-2 px-2 outline-none focus:bg-primary-100 focus:border-secondary-500 placeholder:text-[#c8c4c3] placeholder:font-light font-medium ";
  return (
    <>
      <h3 className="uppercase font-bold text-secondary-500 font-bold text-center text-2xl mt-8">
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
          <label htmlFor="image-url">Image URL</label>
          <input
            ref={urlInputRef}
            value={urlValue}
            onChange={handleURLChange}
            type="url"
            id="image-url"
            placeholder="Image URL"
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
              value={ingValue}
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
          {ingObj?.map((ing, i) => (
            <div key={i} className="normal-case text-gray-700">
              <span className="uppercase font-bold">Ingredient</span> {i + 1}:
              &nbsp; {ing.quantity}, {ing.unit}, {ing.description}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {!isPending && (
            <button
              type="submit"
              className="px-11 py-3 my-6 text-white flex items-center gap-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full hover:scale-105 duration-200"
            >
              <FiUploadCloud className="text-xl mb-1" />
              <span>upload</span>
            </button>
          )}
          {isPending && (
            <button
              type="submit"
              className="px-11 opacity-60 py-3 my-6 text-white flex items-center gap-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full cursor-none "
            >
              <FiUploadCloud className="text-xl mb-1" />
              <span>uploading...</span>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
