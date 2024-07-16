import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [localToken, setLocalToken] = useLocalStorage(
        "biztak_token_demo",
        ""
    );

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

    return (
        <AppContext.Provider
            value={{
                localToken,
                setLocalToken,
                isSideMenuOpen,
                setIsSideMenuOpen,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
