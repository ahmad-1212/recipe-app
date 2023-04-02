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
      if (err.code === "auth/wrong-password") {
        setError("Password is Incorrect");
        setIsPending(false);
        return;
      }

      if (err.code === "auth/user-not-found") {
        setError("Email is Incorrect");
        setIsPending(false);
        return;
      }

      if (err.code === "auth/network-request-failed") {
        setError("Network Error: Slow Internet Connection!");
        setIsPending(false);
        return;
      }

      if (err.code === "auth/internal-error") {
        setError("Network Error: No internet connection!");
        setIsPending(false);
        return;
      }
      setError(err.message);
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
