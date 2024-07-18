import React, { useContext, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../store/AppProvider";

const Toastify = () => {
    const { toastifyObj } = useContext(AppContext);

    useEffect(() => {
        if (toastifyObj.mode) {
            notify(toastifyObj);
        }
    }, [toastifyObj]);

    const notify = ({ title, mode }) => {
        return toast[mode](title, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Toastify;
