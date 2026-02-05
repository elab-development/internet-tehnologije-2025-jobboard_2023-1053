import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function HomeRedirect() {
    const { user, loading, token } = useStateContext();

    if (!token) return <Navigate to="/home" replace />;
    if (loading) return <p>Učitavanje...</p>;
    if (!user) return <Navigate to="/home" replace />;

    switch (user.role) {
        case "admin":
            return <Navigate to="/autenticate/admin" replace />;
        case "company":
            return <Navigate to="/autenticate/company" replace />;
        case "alumni":
            return <Navigate to="/autenticate/alumni" replace />;
        case "student":
            return <Navigate to="/autenticate/student" replace />;
        default:
            return <Navigate to="/home" replace />;
    }
}