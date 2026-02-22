
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
import {Jobs} from "./sceens/Jobs.jsx";
import {Companies} from "./sceens/Companies.jsx";
import JobApplications from "./sceens/company/JobApplications.jsx";
import MyComments from "./sceens/alumni/MyComments.jsx";



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
                    {
                        path: "my-comments",
                        element: <MyComments />
                    }


                ],
            },
            {
                path: "jobs",
                element: <ProtectedRoute allowedRoles={[]} />, // Svi autentifikovani korisnici mogu pristupiti
                children: [
                    { index: true, element: <Jobs /> },  // Komponenta Jobs
                ],
            },
            {
                path: "companies",
                element: <ProtectedRoute allowedRoles={[]} />, // Svi autentifikovani korisnici mogu pristupiti
                children: [
                    { index: true, element: <Companies /> },  // Komponenta Companies
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