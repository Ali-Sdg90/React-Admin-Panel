import React from "react";
import AppProvider from "./store/AppProvider";
import Style from "./assets/styles/App.module.scss";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
    return (
        <HashRouter>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </HashRouter>
    );
};

export default App;
