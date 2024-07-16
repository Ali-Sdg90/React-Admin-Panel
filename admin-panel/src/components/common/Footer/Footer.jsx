import React from "react";
import Style from "./Footer.module.scss";

const Footer = () => {
    return (
        <div className={Style.container}>
            <div className={Style.copyright}>بیزتاک © 1402</div>
            <div className={Style.version}>نسخه 1.0.0</div>
        </div>
    );
};

export default Footer;
