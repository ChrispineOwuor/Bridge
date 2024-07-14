import { Navigate } from "react-router-dom";
import useRoleCheck from "./RoleCheck";


const RouterLinkProvision = ({ children, action }) => {

  const isAuthorized = useRoleCheck(action);

  if (!isAuthorized) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default RouterLinkProvision;
