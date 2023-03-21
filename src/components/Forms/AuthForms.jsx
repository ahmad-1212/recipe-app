import React, { useState } from "react";
import Login from "./LoginForm";
import SignupForm from "./SignupForm";
// Custom Hooks
import useAuthContext from "../../hooks/useAuthContext";
import useRecipeContext from "../../hooks/useRecipeContext";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";

const AuthForm = () => {
  const { login, isPending: loadingLogin, error: loginError } = useLogin();
  const { signup, error: signupError, isPending: signupLoading } = useSignup();
  const { user } = useAuthContext();
  const { setShowModal } = useRecipeContext();
  const [signIn, setSignIn] = useState(true);

  const loginHandler = (email, password) => {
    login(email, password);
  };

  const signupHandler = (email, password) => {
    signup(email, password);
  };

  return (
    <>
      {signIn && (
        <Login
          onLogin={loginHandler}
          isPending={loadingLogin}
          error={loginError}
          user={user}
          setShowModal={setShowModal}
        />
      )}
      {!signIn && (
        <SignupForm
          onSignup={signupHandler}
          isPending={signupLoading}
          error={signupError}
          user={user}
          setShowModal={setShowModal}
        />
      )}

      {signIn && (
        <p className="text-base text-center ">
          Don't have an account ?{" "}
          <span
            onClick={() => setSignIn(false)}
            className="cursor-pointer text-secondary-500 underline"
          >
            Sign up
          </span>
        </p>
      )}
      {!signIn && (
        <p className="text-base text-center ">
          Alread have an account ?{" "}
          <span
            onClick={() => setSignIn(true)}
            className="cursor-pointer text-secondary-500 underline"
          >
            Login
          </span>
        </p>
      )}
    </>
  );
};

export default AuthForm;
