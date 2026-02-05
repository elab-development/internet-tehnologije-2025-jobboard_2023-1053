import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function ProtectedRoute({ allowedRoles = [] }) {
    const { token, user,loading } = useStateContext();

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }
    if (loading) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p>Učitavanje...</p>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (allowedRoles.length === 0) {
        return <Outlet />;
    }

    const role=user.role;
    if (!allowedRoles(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}