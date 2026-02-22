import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import {Navbar} from "./NavBar.jsx";
export default function DefaultLayout() {
    const { user, token, setUser, setToken, loading } = useStateContext();
    const navigate = useNavigate();

    console.log("user:", user);
    console.log("token:", token);



    if (loading) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p>Učitavanje...</p>
            </div>
        );
    }

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        navigate("/home");
    };



    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <Navbar/>
            <Outlet/>
        </div>
    );
}