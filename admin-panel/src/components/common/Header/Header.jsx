import React, { useContext } from "react";
import Style from "./Header.module.scss";
import { AppContext } from "./../../../store/AppProvider";

const Header = () => {
    const { localToken, setIsSideMenuOpen } = useContext(AppContext);

    const sideMenuHandler = () => {
        setIsSideMenuOpen((prevState) => !prevState);
    };

    return (
        <div className={Style.container}>
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
