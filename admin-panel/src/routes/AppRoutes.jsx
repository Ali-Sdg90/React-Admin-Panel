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
                <Route path="React-Admin-Panel/login" element={<Login />} />
                <Route
                    path="React-Admin-Panel/home-page"
                    element={<HomePage />}
                />
                <Route
                    path="React-Admin-Panel/user-profile"
                    element={<UserProfile />}
                />
                <Route
                    path="/"
                    element={<Navigate to="React-Admin-Panel/login" replace />}
                />
                <Route
                    path="/React-Admin-Panel"
                    element={<Navigate to="React-Admin-Panel/login" replace />}
                />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
