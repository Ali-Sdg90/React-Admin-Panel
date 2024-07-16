import React, { useContext } from "react";
import Style from "./Header.module.scss";
import { AppContext } from "./../../../store/AppProvider";

const Header = () => {
    const { localToken, setIsSideMenuClose, isSideMenuClose } =
        useContext(AppContext);

    const sideMenuHandler = () => {
        setIsSideMenuClose((prevState) => !prevState);
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
                <div className={Style.userName}>{localToken.fullName}</div>
                <div></div>
                <div className={Style.userImg}></div>
            </div>
        </div>
    );
};

export default Header;
