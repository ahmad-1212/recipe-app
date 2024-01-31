import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import useAuthContext from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatchAuth } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // Login the user
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      // dispatch login action

      dispatchAuth({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError("Invalid Email or password!");
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
