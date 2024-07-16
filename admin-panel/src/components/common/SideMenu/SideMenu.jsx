import React, { useContext } from "react";
import Style from "./SideMenu.module.scss";
import { AppContext } from "../../../store/AppProvider";

const SideMenu = () => {
    const { isSideMenuClose } = useContext(AppContext);

    return (
        <div
            className={`${Style.container} ${
                isSideMenuClose && Style.closeMenu
            }`}
        >
            <div className={Style.sideMenuContent}>
                <div className={Style.menuTitle}>پنل مدیریت</div>

                <div className={Style.menuItems}>
                    <div className={Style.menuItem1}>صفحه اصلی</div>
                    <div className={Style.menuItem2}>لیست کاربران</div>
                    <span className={Style.menuGap}></span>
                    <div className={Style.menuItem3}>ایجاد کاربر جدید</div>
                    <div className={Style.menuItem4}>
                        درخواست‌های تغییر اطلاعات
                    </div>
                    <div className={Style.menuItem5}>پیگیری بیزکارت ها‌</div>
                    <div className={Style.menuItem6}>جلسات نیازمند بررسی</div>
                    <div className={Style.menuItem7}>تخلفات گزارش شده</div>
                    <div className={Style.menuItem8}>نظرات ثبت شده</div>
                    <span className={Style.menuGap}></span>
                    <div className={Style.menuItem9}>از من بپرس</div>
                    <div className={Style.menuItem10}>کد تخفیف عمومی</div>
                    <div className={Style.menuItem11}>مدیریت اپلیکیشن</div>
                    <div className={Style.menuItem12}>مدیریت ادمین‌ها</div>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
