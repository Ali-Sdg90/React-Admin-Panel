import React from "react";
import AppProvider from "./store/AppProvider";
import Style from "./assets/styles/App.module.scss";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </BrowserRouter>
    );
};

export default App;
