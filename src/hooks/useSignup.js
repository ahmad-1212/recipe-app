import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import useAuthContext from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatchAuth } = useAuthContext();

  const signup = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete Signup");
      }

      // Dispatch login action
      dispatchAuth({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("The Email you entered is already in use.");
        setIsPending(false);
        return;
      }

      if (err.code === "auth/internal-error") {
        setError("Network Error: No internet connection!");
        setIsPending(false);
        return;
      }
      if (err.code === "auth/network-request-failed") {
        setError("Network Error: Slow Internet Connection!");
        setIsPending(false);
        return;
      }
      setIsPending(false);
      setError(err.message);
    }
  };

  return { error, isPending, signup };
};
