import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const useRoleCheck = (action) => {
  const { role  } = useContext(AuthContext);


  if (!role ===action ) {
    return <Navigate to="/" replace={true} />;
  }

  return true;
};

export default useRoleCheck;
