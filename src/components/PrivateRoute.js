import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Show a loader while Firebase checks auth
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    // Not logged in → redirect to Sign In
    return <Navigate to="/signin" replace />;
  }

  // Logged in → render the page
  return children;
};

export default PrivateRoute;
