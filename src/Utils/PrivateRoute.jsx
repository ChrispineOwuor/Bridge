import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
const PrivateRoutes = ({ children }) => {
  let { user} = useContext(AuthContext);
  return !user ? (
    <>
      <Navigate to="/" />
    </>
  ) : (
   <> { children }</>
  );
};

export default PrivateRoutes;
