import React, { useContext } from "react";
import Style from "./Header.module.scss";
import { AppContext } from "./../../../store/AppProvider";

const Header = () => {
    const {
        localToken,
        setIsSideMenuClose,
        isSideMenuClose,
        setLocalToken,
        setToastifyObj,
    } = useContext(AppContext);

    const sideMenuHandler = () => {
        setIsSideMenuClose((prevState) => !prevState);
    };

    const logoutHandler = () => {
        setToastifyObj({ title: "Logout Successful", mode: "success" });
        setLocalToken("");
    };

    return (
        <div
            className={`${Style.container} ${
                isSideMenuClose && Style.closeMenu
            }`}
        >
            <div className={Style.rightSection} onClick={sideMenuHandler}></div>

            <div className={Style.leftSection}>
                <div className={Style.downArrow}></div>
                <div className={Style.userName} onClick={logoutHandler}>
                    {localToken.fullName}
                </div>
                <div></div>
                <div className={Style.userImg}></div>
            </div>
        </div>
    );
};

export default Header;
