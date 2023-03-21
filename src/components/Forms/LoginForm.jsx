import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, isPending, error, user, setShowModal }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleEmail = () => {
    setEmailError(null);
    setEmailValue(emailRef.current.value);
  };
  const handlePassword = () => {
    setPasswordError(null);
    setPasswordValue(passwordRef.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValue.length === 0) {
      setEmailError("Enter Email");
    }
    if (passwordValue.length === 0) {
      setPasswordError("Enter Password");
      return;
    }

    onLogin(emailValue, passwordValue);
  };

  useEffect(() => {
    // If login Secceed navigate to home page and hide modal
    if (!isPending && !error && user) {
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
            value={emailValue}
            onChange={handleEmail}
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
            value={passwordValue}
            onChange={handlePassword}
            type="password"
            id="password"
            placeholder="Enter your password"
            className={`${inputStyles} ${passwordError ? "input-error" : ""}`}
          />
          {passwordError && <p className={errorStyles}>{passwordError}</p>}
        </div>
        <div>
          {!isPending && (
            <button
              type="submit"
              className="px-11 py-3 mb-1 text-white gap-3 bg-gradient-to-br from-primary-500 to-secondary-500 w-full text-center hover:scale-105 duration-200"
            >
              Login
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

export default Login;
