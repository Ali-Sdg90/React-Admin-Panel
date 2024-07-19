import React, { useContext, useEffect, useState } from "react";
import Style from "./UserProfile.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../store/AppProvider";
import axios from "axios";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import SideMenu from "../../components/common/SideMenu/SideMenu";

const UserProfile = () => {
    const { localToken, isSideMenuClose } = useContext(AppContext);

    const { userId } = useParams();

    const [pageData, setPageData] = useState({});

    const navigate = useNavigate();

    const [isRecipientAdvisor, setIsRecipientAdvisor] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (localToken.token && userId) {
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

                    const userData = response.data.data.users.filter(
                        (member) => member._id === userId
                    );

                    if (!userData[0]) {
                        throw new Error("Invalid User ID");
                    }

                    console.log("userData >>", userData[0]);
                    setPageData(userData[0]);
                } catch (err) {
                    console.log("ERROR >>", err);
                    navigate("/React-Admin-Panel/page-not-found");
                }
            } else {
                navigate("/React-Admin-Panel/login");
            }
        };

        fetchData();
    }, [localToken, userId]);

    return (
        <div
            className={`${Style.container} ${
                isSideMenuClose && Style.closeMenu
            }`}
        >
            <div className={Style.pageContent}>
                <Header />
                <div className={Style.profileSection}>
                    <div className={Style.userInfo}>
                        <div className={Style.topSection}>
                            <div className={Style.rightSection}>
                                {Object.keys(pageData).length ? (
                                    <>
                                        <div className={Style.userImg}></div>
                                        <div className={Style.userDetails}>
                                            <div className={Style.userName}>
                                                {pageData.fullName}
                                            </div>
                                            <div
                                                className={Style.userDetailsRow}
                                            >
                                                <div
                                                    className={
                                                        Style.userDetail1
                                                    }
                                                >
                                                    {pageData.userType}
                                                </div>
                                                <div
                                                    className={
                                                        Style.userDetail2
                                                    }
                                                >
                                                    {pageData.userName}
                                                </div>
                                                <div
                                                    className={
                                                        Style.userDetail3
                                                    }
                                                >
                                                    مدیر محصول
                                                </div>
                                                <div
                                                    className={
                                                        Style.userDetail4
                                                    }
                                                >
                                                    {pageData.phoneNumber}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <h2 style={{ height: "104px" }}>Loading</h2>
                                )}
                            </div>

                            <div className={Style.leftSection}>
                                <button className={Style.profileActive}>
                                    پروفایل فعال
                                </button>
                                <button className={Style.callUser}>
                                    تماس با کاربر
                                </button>
                            </div>
                        </div>

                        <div className={Style.profileSwitch}>
                            <div
                                className={
                                    isRecipientAdvisor && Style.profileActive
                                }
                                onClick={() =>
                                    setIsRecipientAdvisor(
                                        (prevState) => !prevState
                                    )
                                }
                            >
                                پروفایل مشاور
                            </div>
                            <div
                                className={
                                    !isRecipientAdvisor && Style.profileActive
                                }
                                onClick={() =>
                                    setIsRecipientAdvisor(
                                        (prevState) => !prevState
                                    )
                                }
                            >
                                پروفایل مشاور گیرنده
                            </div>
                        </div>
                    </div>

                    {isRecipientAdvisor ? (
                        <div className={Style.profileBtns}>
                            <div className={Style.profileBtn1}>
                                اطلاعات کاربر
                            </div>
                            <div className={Style.profileBtn2}>کیف پول</div>
                            <div className={Style.profileBtn3}>تقویم جلسات</div>
                            <div className={Style.profileBtn4}>
                                پیگیری کارت‌
                            </div>
                            <div className={Style.profileBtn5}>لیست جلسات</div>
                            <div className={Style.profileBtn6}>تراکنش ها</div>
                            <div className={Style.profileBtn7}>
                                کد تخفیف اختصاصی
                            </div>
                            <div className={Style.profileBtn8}>
                                نظرات ثبت شده
                            </div>
                        </div>
                    ) : (
                        <div className={Style.whiteSpace}></div>
                    )}
                </div>
                <Footer />
            </div>
            <SideMenu />
        </div>
    );
};

export default UserProfile;
