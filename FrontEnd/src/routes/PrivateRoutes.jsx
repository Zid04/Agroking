import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Check if user is admin
const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};

export default function PrivateRoute() {
  // First check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  // Then check if user is admin
  if (!isAdmin()) {
    // Redirect to home if authenticated but not admin
    return <Navigate to="/" replace />;
  }
  
  // User is authenticated and is admin, allow access
  return <Outlet />;
}
