import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "../layout/NotFound";
const AdminRoute = ({ children }) => {
  const { isAuthenticated, users,status } = useSelector((state) => state.user);
  

  if (isAuthenticated === false || status==="idle"  || !users) {
    return <NotFound/>
  }

  return isAuthenticated === true && users?.user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
