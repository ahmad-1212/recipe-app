import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, isPending, error, user, setShowModal }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = () => {
    setEmailError(null);
  };
  const handlePasswordChange = () => {
    setPasswordError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailRef.current.value.length === 0) {
      setEmailError("Enter Email");
    }
    if (passwordRef.current.value.length === 0) {
      setPasswordError("Enter Password");
      return;
    }

    onLogin(emailRef.current.value, passwordRef.current.value);
  };

  useEffect(() => {
    // If login Secceed navigate to home page and hide modal
    if (!isPending && !error && user) {
      emailRef.current.value = passwordRef.current.value = "";
      setShowModal(false);
      navigate("/");
    }
  }, [isPending, error, user, setShowModal, navigate]);

  // Repeated  Styles
  const styles = "flex flex-col gap-2 mb-3 uppercase text-base ";
  const errorStyles = "text-sm normal-case text-[#ff8585d8]";
  const inputStyles =
    "border-[1px] border-gray-700 rounded py-1 px-2 outline-none focus:bg-primary-100 focus:border-secondary-500 placeholder:text-[#c8c4c3] placeholder:font-light font-medium ";

  return (
    <>
      <h2 className="text-center text-secondary-500 text-2xl">Login</h2>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="form mt-[40px]  w-5/6 sm:w-4/6 md:w-3/6 flex flex-col gap-4 m-auto"
      >
        <div className={styles}>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            onChange={handleEmailChange}
            type="email"
            id="email"
            placeholder="Enter your Email"
            className={`${inputStyles} ${emailError ? "input-error" : ""}`}
          />
          {emailError && <p className={errorStyles}>{emailError}</p>}
        </div>
        <div className={styles}>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            onChange={handlePasswordChange}
            type="password"
            id="password"
            placeholder="Enter your password"
            className={`${inputStyles} ${passwordError ? "input-error" : ""}`}
          />
          {passwordError && <p className={errorStyles}>{passwordError}</p>}
        </div>
        <div>
          <button
            type="submit"
            disabled={isPending}
            className=" rounded-md px-11 py-3 mb-1 text-white gap-3 bg-gradient-to-br from-primary-500 to-secondary-500 w-full text-center  hover:scale-105 disabled:hover:scale-100 duration-200 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isPending ? "Loading..." : "Login"}
          </button>

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

export default Login;
