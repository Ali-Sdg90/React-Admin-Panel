import React, { useContext, useEffect, useState } from "react";
import Style from "./HomePage.module.scss";
import { AppContext } from "../../store/AppProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/common/SideMenu/SideMenu";
import Header from "../../components/common/Header/Header";

const HomePage = () => {
    const { localToken, isSideMenuOpen } = useContext(AppContext);

    const [pageData, setPageData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        console.log("localToken >>", localToken);

        const fetchData = async () => {
            if (localToken.token) {
                try {
                    const response = await axios.get(
                        "http://193.56.59.51:50004/admin/api/home/users",
                        {
                            headers: {
                                Authorization: `Bearer ${localToken.token}`,
                            },
                            params: {
                                page: 1,
                                sortField: "fullName",
                                sortOrder: -1,
                                status: "ACTIVE",
                            },
                        }
                    );

                    console.log("DATA: ", response.data);

                    setPageData(response.data.data);
                } catch (err) {
                    console.log("ERROR >>", err);
                }
            } else {
                navigate("/login");
            }
        };

        // fetchData();
    }, [localToken]);

    return (
        <div
            className={`${Style.container} ${
                isSideMenuOpen && Style.closeMenu
            }`}
        >
            <div className={Style.pageContent}>
                <Header />
                <div className={Style.quickAccessSection}>
                    <div className={Style.quickAccessHeader}>دسترسی سریع</div>
                    <div className={Style.quickAccessBtns}>
                        <div className={Style.quickAccessBtn1}>
                            درخواست‌های تغییر اطلاعات
                        </div>
                        <div className={Style.quickAccessBtn2}>
                            پیگیری بیزکارت ها‌
                        </div>
                        <div className={Style.quickAccessBtn3}>
                            نظرات ثبت شده
                        </div>
                        <div className={Style.quickAccessBtn4}>
                            درخواست‌های‌ جلسه
                        </div>
                        <div className={Style.quickAccessBtn5}>
                            جلسات نیازمند بررسی
                        </div>
                        <div className={Style.quickAccessBtn6}>
                            تخلفات گزارش شده
                        </div>
                    </div>
                </div>

                <div className={Style.usersList}>
                    <div className={Style.topSection}>
                        <div className={Style.sectionTitle}>لیست کاربران</div>
                        <button className={Style.addUserBtn}>کاربر جدید</button>
                    </div>

                    <div className={Style.userTable}>
                        <div className={Style.filterItems}>
                            <span></span>
                            <div>1</div>
                            <div>1</div>
                            <div>1</div>
                            <div>1</div>
                            <span></span>
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>

                        <div className={Style.userList}>
                            <div className={Style.userRow}>
                                <div className={Style.userImg}></div>
                                <div>محمد علی آسیابچی</div>
                                <div>ma_asiabchi</div>
                                <div>09120148529</div>
                                <div>فعال</div>
                                <div>مشاور + مشاوره گیرنده</div>
                            </div>
                            <div className={Style.userRow}>
                                <div className={Style.userImg}></div>
                                <div>محمد علی آسیابچی</div>
                                <div>ma_asiabchi</div>
                                <div>09120148529</div>
                                <div>فعال</div>
                                <div>مشاور + مشاوره گیرنده</div>
                            </div>
                        </div>

                        <div className={Style.tableNav}></div>
                    </div>
                </div>
            </div>
            <SideMenu />
        </div>
    );
};

export default HomePage;
