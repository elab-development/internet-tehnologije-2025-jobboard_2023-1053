import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function HomeRedirect() {
    const { user, loading, token } = useStateContext();

    if (!token) return <Navigate to="/auth/login" replace />;
    if (loading) return <p>Učitavanje...</p>;
    if (!user) return <Navigate to="/auth/login" replace />;

    switch (user.role) {
        case "admin":
            return <Navigate to="/admin" replace />;
        case "company":
            return <Navigate to="/company" replace />;
        case "alumni":
            return <Navigate to="/alumni" replace />;
        case "student":
            return <Navigate to="/student" replace />;
        default:
            return <Navigate to="/auth/login" replace />;
    }
}