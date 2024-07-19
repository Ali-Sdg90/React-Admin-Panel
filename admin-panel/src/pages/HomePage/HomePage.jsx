import React, { useContext, useEffect, useState } from "react";
import Style from "./HomePage.module.scss";
import { AppContext } from "../../store/AppProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/common/SideMenu/SideMenu";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

import upArrow from "../../assets/images/icons/home-page/up-arrow.svg";
import downArrow from "../../assets/images/icons/home-page/down-arrow.svg";

const HomePage = () => {
    const { localToken, isSideMenuClose } = useContext(AppContext);

    const [pageData, setPageData] = useState({});
    const [showUsers, setShowUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchInputs, setSearchInputs] = useState({
        fullName: "",
        userName: "",
        phoneNumber: "",
        statusTitle: "",
        userType: "",
    });
    const [sortMode, setSortMode] = useState({
        mode: "phoneNumber",
        isIncrease: false,
    });

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
                navigate("/React-Admin-Panel/login");
            }
        };

        fetchData();
    }, [localToken]);

    const userClickHAndler = (id) => {
        navigate(`/React-Admin-Panel/user-profile/${id}`);
    };

    const searchUser = (e, mode) => {
        console.log(e.target.value, mode);

        setSearchInputs((prevState) => ({
            ...prevState,
            [mode]: e.target.value,
        }));
    };

    useEffect(() => {
        if (Object.keys(pageData).length > 0) {
            let suitableUsers = pageData.users.filter((user) =>
                Object.keys(searchInputs).every((key) =>
                    user[key]
                        .toLowerCase()
                        .includes(searchInputs[key].toLowerCase())
                )
            );

            console.log("suitableUsers >>", suitableUsers);

            setShowUsers(suitableUsers);
        }
    }, [searchInputs, pageData]);

    const sortBtnStyle = (mode) => {
        if (sortMode["mode"] === mode) {
            if (sortMode.isIncrease) {
                return {
                    backgroundImage: `url(${upArrow})`,
                    backgroundSize: "16px",
                };
            } else {
                return {
                    backgroundImage: `url(${downArrow})`,
                    backgroundSize: "16px",
                };
            }
        } else {
            return {};
        }
    };

    const sortFunction = (array, mode) => {
        array.sort((a, b) => {
            let nameA = a[mode].toLowerCase();
            let nameB = b[mode].toLowerCase();
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
        });

        if (sortMode.isIncrease) {
            array = array.reverse();
        }

        return array;
    };

    const sortClickHandler = (mode) => {
        setSortMode((prevState) => {
            if (prevState.mode === mode) {
                return {
                    mode: mode,
                    isIncrease: !prevState.isIncrease,
                };
            } else {
                return {
                    mode: mode,
                    isIncrease: true,
                };
            }
        });

        const sortedUsers = sortFunction(showUsers, mode);

        setShowUsers(sortedUsers);
    };

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
                                <div
                                    style={sortBtnStyle("fullName")}
                                    onClick={() => sortClickHandler("fullName")}
                                >
                                    نام و نام خانوادگی
                                </div>
                                <div
                                    style={sortBtnStyle("userName")}
                                    onClick={() => sortClickHandler("userName")}
                                >
                                    نام کاربری
                                </div>
                                <div
                                    style={sortBtnStyle("phoneNumber")}
                                    onClick={() =>
                                        sortClickHandler("phoneNumber")
                                    }
                                >
                                    شماره موبایل
                                </div>
                                <div
                                    style={sortBtnStyle("statusTitle")}
                                    onClick={() =>
                                        sortClickHandler("statusTitle")
                                    }
                                >
                                    وضعیت
                                </div>
                                <div
                                    style={sortBtnStyle("userType")}
                                    onClick={() => sortClickHandler("userType")}
                                >
                                    نوع پروفایل
                                </div>
                            </div>

                            <div className={Style.filterItems}>
                                <span></span>
                                <input
                                    type="text"
                                    autoComplete="none"
                                    onChange={(e) => searchUser(e, "fullName")}
                                    value={searchInputs.fullName}
                                />
                                <input
                                    type="text"
                                    autoComplete="none"
                                    onChange={(e) => searchUser(e, "userName")}
                                    value={searchInputs.userName}
                                />
                                <input
                                    type="text"
                                    autoComplete="none"
                                    onChange={(e) =>
                                        searchUser(e, "phoneNumber")
                                    }
                                    value={searchInputs.phoneNumber}
                                />
                                <input
                                    type="text"
                                    autoComplete="none"
                                    onChange={(e) =>
                                        searchUser(e, "statusTitle")
                                    }
                                    value={searchInputs.statusTitle}
                                />
                                <input
                                    type="text"
                                    autoComplete="none"
                                    onChange={(e) => searchUser(e, "userType")}
                                    value={searchInputs.userType}
                                />
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
                                    showUsers.map((userData, index) => {
                                        if (
                                            index <= pageNumber * 8 &&
                                            index >= (pageNumber - 1) * 8
                                        ) {
                                            return (
                                                <div
                                                    className={Style.userRow}
                                                    key={userData._id}
                                                    onClick={() =>
                                                        userClickHAndler(
                                                            userData._id
                                                        )
                                                    }
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
                                        } else {
                                            console.log(">>>", index);
                                        }
                                    })
                                ) : (
                                    <h1
                                        dir="ltr"
                                        style={{
                                            textAlign: "center",
                                            marginTop: "20px",
                                        }}
                                    >
                                        Loading...
                                    </h1>
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
