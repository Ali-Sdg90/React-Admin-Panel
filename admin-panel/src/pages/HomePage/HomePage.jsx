import React, { useContext, useEffect, useState } from "react";
import Style from "./HomePage.module.scss";
import { AppContext } from "../../store/AppProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/common/SideMenu/SideMenu";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

const HomePage = () => {
    const { localToken, isSideMenuClose } = useContext(AppContext);

    const [pageData, setPageData] = useState({});
    const [pageNumber, setPageNumber] = useState(1);

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

                    console.log("DATA: ", response.data.data);

                    setPageData(response.data.data);
                } catch (err) {
                    console.log("ERROR >>", err);
                }
            } else {
                navigate("/login");
            }
        };

        fetchData();
    }, [localToken]);

    return (
        <div
            className={`${Style.container} ${
                isSideMenuClose && Style.closeMenu
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

                    <div className={Style.userTableContainer}>
                        <div className={Style.userTable}>
                            <div className={Style.filterItems}>
                                <span></span>
                                <div>نام و نام خانوادگی</div>
                                <div>نام کاربری</div>
                                <div>شماره موبایل</div>
                                <div>وضعیت</div>
                                <div>نوع پروفایل</div>
                            </div>

                            <div className={Style.filterItems}>
                                <span></span>
                                <input type="text" autoComplete="none" />
                                <input type="text" autoComplete="none" />
                                <input type="text" autoComplete="none" />
                                <input type="text" autoComplete="none" />
                                <input type="text" autoComplete="none" />
                            </div>

                            <div className={Style.userList}>
                                {/* <div className={Style.userRow}>
                                <div className={Style.userImg}>
                                    <div></div>
                                </div>
                                <div>محمد علی آسیابچی</div>
                                <div>ma_asiabchi</div>
                                <div>09120148529</div>
                                <div>فعال</div>
                                <div>مشاور + مشاوره گیرنده</div>
                            </div> */}

                                {Object.keys(pageData).length > 0 ? (
                                    pageData.users.map((userData, index) => {
                                        if (
                                            index < pageNumber * 10 &&
                                            index > (pageNumber - 1) * 10
                                        ) {
                                            return (
                                                <div
                                                    className={Style.userRow}
                                                    key={userData.index}
                                                >
                                                    <div
                                                        className={
                                                            Style.userImg
                                                        }
                                                    >
                                                        <div
                                                        // style={{
                                                        //     background:
                                                        //         userData.profileImage &&
                                                        //         `url(${userData.profileImage})`,
                                                        // }}
                                                        ></div>
                                                    </div>
                                                    <div
                                                        title={
                                                            userData.fullName
                                                        }
                                                    >
                                                        {userData.fullName}
                                                    </div>
                                                    <div
                                                        title={
                                                            userData.userName
                                                        }
                                                    >
                                                        {userData.userName}
                                                    </div>
                                                    <div
                                                        title={
                                                            userData.phoneNumber
                                                        }
                                                    >
                                                        {userData.phoneNumber}
                                                    </div>
                                                    <div
                                                        title={
                                                            userData.statusTitle
                                                        }
                                                    >
                                                        {userData.statusTitle}
                                                    </div>
                                                    <div
                                                        title={
                                                            userData.userType
                                                        }
                                                    >
                                                        {userData.userType}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                                ) : (
                                    <h1 dir="ltr">Loading...</h1>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={Style.tableNav}></div>
                </div>

                <Footer />
            </div>
            <SideMenu />
        </div>
    );
};

export default HomePage;
