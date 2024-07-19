import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage/HomePage";
import UserProfile from "../pages/UserProfile/UserProfile";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Toastify from "../components/else/Toastify/Toastify";
import ScrollToTop from "../components/else/ScrollToTop/ScrollToTop";

const AppRoutes = () => {
    return (
        <div>
            <Toastify />
            <ScrollToTop />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/user-profile/:userId" element={<UserProfile />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/page-not-found" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/page-not-found" />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
