import React, { ReactElement, useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const RequireAuth = ({
  redirectTo,
  children,
}: {
  redirectTo: string;
  children: ReactElement;
}) => {
  const { user } = useContext(AuthContext);
  return (
    <React.Fragment>
      {user ? children : <Navigate to={redirectTo} />}
    </React.Fragment>
  );
};

export default RequireAuth;
