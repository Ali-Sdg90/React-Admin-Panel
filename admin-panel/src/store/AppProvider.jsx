import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [localToken, setLocalToken] = useLocalStorage(
        "biztak_token_demo",
        ""
    );

    const [isSideMenuClose, setIsSideMenuClose] = useState(true);
    const [toastifyObj, setToastifyObj] = useState({
        title: "",
        mode: "",
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1075) {
                setIsSideMenuClose(true);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <AppContext.Provider
            value={{
                localToken,
                setLocalToken,
                isSideMenuClose,
                setIsSideMenuClose,
                toastifyObj,
                setToastifyObj,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
