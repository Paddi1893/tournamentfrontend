import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({user}) => {
    if(!localStorage.getItem("id")){
        return <Navigate to={"/"} replace />;
    }
    return <Outlet/>
}

export default ProtectedRoute;