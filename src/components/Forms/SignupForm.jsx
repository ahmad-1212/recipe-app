import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../../schemas";

const SignupForm = ({ onSignup, isPending, error, user, setShowModal }) => {
  const navigate = useNavigate();
  const onSubmit = () => {
    const { email, password } = values;
    onSignup(email, password);
  };

  // Using Formik for Validation

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
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  useEffect(() => {
    // If Signup Succeed then hide modal and navigate to 'add-recipe' page
    if (!isPending && user) {
      setShowModal(false);
      navigate("/add-recipe");
      resetForm();
    }
  }, [user, isPending, resetForm, navigate, setShowModal]);

  //Repeated Styles
  const styles = "flex flex-col gap-2 mb-2 uppercase text-base ";
  const errorStyles = "text-sm normal-case text-[#ff8585d8]";
  const inputStyles =
    "border-[1px] border-gray-700 rounded py-2 px-2 outline-none focus:bg-primary-100 focus:border-secondary-500 placeholder:text-[#c8c4c3] placeholder:font-light font-medium ";

  return (
    <>
      <h2 className="text-center text-secondary-500 text-2xl">
        Create an Account by Signing Up!
      </h2>
      <form
        onSubmit={handleSubmit}
        className="form mt-[40px] w-5/6 sm:w-3/6 flex flex-col gap-4 m-auto"
      >
        <div className={styles}>
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            type="email"
            id="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputStyles} ${
              errors.email && touched.email ? "input-error" : ""
            }`}
          />
          {errors.email && touched.email && (
            <p className={errorStyles}>{errors.email}</p>
          )}
        </div>
        <div className={styles}>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputStyles} ${
              errors.password && touched.password ? "input-error" : ""
            }`}
          />
          {errors.password && touched.password && (
            <p className={errorStyles}>{errors.password}</p>
          )}
        </div>
        <div className={styles}>
          <label htmlFor="confirm">Confirm Password</label>
          <input
            value={values.confirm}
            type="password"
            id="confirm"
            placeholder="Confirm Password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputStyles} ${
              errors.confirm && touched.confirm ? "input-error" : ""
            }`}
          />
          {errors.confirm && touched.confirm && (
            <p className={errorStyles}>{errors.confirm}</p>
          )}
        </div>
        <div>
          {!isPending && (
            <button
              type="submit"
              className="px-11 py-3 mb-1 text-white gap-3 bg-gradient-to-br from-primary-500 to-secondary-500 w-full text-center hover:scale-105 duration-200"
            >
              Signup
            </button>
          )}
          {isPending && (
            <button
              type="submit"
              disabled
              className="px-11 py-3 mb-1 normal-case opacity-60 cursor-none text-white gap-3  bg-gradient-to-br from-primary-500 to-secondary-500  w-full text-center"
            >
              Loading...
            </button>
          )}
          {error && (
            <p className="text-base text-[#ff0000] text-center mb-3 mt-1">
              {error}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default SignupForm;
