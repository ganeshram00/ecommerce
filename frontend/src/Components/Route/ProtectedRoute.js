import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  // Directly return the Navigate component if not authenticated
  if (isAuthenticated === false) {
    return <Navigate to="/Register" />;
  }

  // Show children if authenticated
  return isAuthenticated ? children : <div>Loading...</div>; // Replace "Loading..." with a loader if needed
};

export default ProtectedRoute;
