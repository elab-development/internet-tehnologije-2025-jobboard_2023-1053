import {useStateContext} from "../context/ContextProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function GuestLayout() {
    const {user,token}=useStateContext();
    if(token){
        return <Navigate to="/autenticate"/>
    }

    return (
        <div>
            <Outlet/>
        </div>
    );
}