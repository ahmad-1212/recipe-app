import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuthContext;
