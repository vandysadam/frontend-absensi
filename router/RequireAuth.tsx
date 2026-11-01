
import { JSX } from 'react';
import { useTypedSelector } from '../store';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

interface RequireAuthProps {
  children: JSX.Element;
  [key: string]: any;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
}: RequireAuthProps) => {
  const { isAuthenticated, persistedToken } = useTypedSelector(
    
    (state) => state.authSlice,
  );
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("persistedToken:", persistedToken);


  
  const checkAuth = isAuthenticated && persistedToken;
  let location = useLocation();

  // const skipLogin = import.meta.env.VITE_APP_SKIP_LOGIN;

  if (!checkAuth) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }

  return children;

    // return isAuthenticated && persistedToken ? (
    //   children
    // ) : (
    //   <Redirect to="/signin" />
    // );
};

export default RequireAuth;
