import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [localToken, setLocalToken] = useLocalStorage(
        "biztak_token_demo",
        ""
    );

    return (
        <AppContext.Provider value={{ localToken, setLocalToken }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
