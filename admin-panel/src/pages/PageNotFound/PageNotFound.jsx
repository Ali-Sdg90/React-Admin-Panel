import React from "react";
import Style from "./PageNotFound.module.scss";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={Style.container}>
            <h1>Page Not Found</h1>
            <button
                onClick={() => {
                    navigate("/React-Admin-Panel/login");
                }}
            >
                Go To Login Page
            </button>
        </div>
    );
};

export default PageNotFound;
