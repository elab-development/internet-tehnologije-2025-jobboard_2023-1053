
import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import {Login} from "./sceens/Login.jsx";
import {Register} from "./sceens/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomeRedirect from "./components/HomeRedirect.jsx";
import HomeCompany from "./sceens/company/HomeCompany.jsx";
import HomeStudent from "./sceens/student/HomeStudent.jsx";
import HomeAlumni from "./sceens/alumni/HomeAlumni.jsx";
import {Home} from "./sceens/Home.jsx";




const router = createBrowserRouter([
    {
        path: "/",
        element:<GuestLayout/>,
        children: [
            { path: "login", element: <Login/> },
            { path: "register", element: <Register /> },
            {path: "home", element: <Home /> },
            { index: true, element: <Home /> },
        ],
    },

    {
        path: "/autenticate",
        element: <DefaultLayout />,
        children: [
            {
                element: <ProtectedRoute allowedRoles={[]} />,
                children: [
                    { index: true, element: <HomeRedirect/> },
                ],
            },

            {
                path: "company",
                element: <ProtectedRoute allowedRoles={["company"]} />,
                children: [

                    { index: true, element: <HomeCompany />

                    },
                    {
                        path: "jobs/:jobId/applications",
                        element: <JobApplications />
                    }

                ],
            },
            {
                path: "student",
                element: <ProtectedRoute allowedRoles={["student"]} />,
                children: [
                    { index: true, element: <HomeStudent /> },

                ],
            },
            {
                path: "alumni",
                element: <ProtectedRoute allowedRoles={["alumni"]} />,
                children: [
                    { index: true, element: <HomeAlumni /> },



                ],
            },


        ],
    },

    {
        path: "*",
        element: <Home />,
    },
]);

export default router;