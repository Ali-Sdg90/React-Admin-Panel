import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage/HomePage";
import UserProfile from "../pages/UserProfile/UserProfile";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
