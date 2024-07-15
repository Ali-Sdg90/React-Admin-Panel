import React, { useContext, useEffect, useState } from "react";
import Style from "./Login.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../store/AppProvider";

const Login = () => {
    const { localToken, setLocalToken } = useContext(AppContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://193.56.59.51:50004/admin/api/login",
                {
                    phone: formData.username,
                    password: formData.password,
                }
            );
            console.log("response >>", response);

            if (response.data.ok) {
                const saveData = {
                    token: response.data.data.token,
                    fullName: response.data.data.fullName,
                };

                setLocalToken(saveData);

                navigate("/home-page");
            }
        } catch (err) {
            console.log("ERROR >>", err);
        }

        console.log("formData >>", formData);
    };

    return (
        <div className={Style.container}>
            <div className={Style.loginSection}>
                <div className={Style.leftSide}>
                    <div className={Style.leftSideText}>بیزتاک</div>
                </div>
                <div className={Style.rightSide}>
                    <div className={Style.sectionHeader}>ورود</div>

                    <form
                        className={Style.formContainer}
                        onSubmit={formSubmitHandler}
                    >
                        <div className={Style.usernameContainer}>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                required
                                autoComplete="off"
                                onChange={(e) =>
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        username: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className={Style.passwordContainer}>
                            <input
                                type="password"
                                name="password"
                                className={Style.passwordInput}
                                value={formData.password}
                                required
                                autoComplete="off"
                                onChange={(e) =>
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        password: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className={Style.bottomSection}>
                            <input
                                className={Style.submitBtn}
                                type="submit"
                                value="ورود"
                            />

                            <div className={Style.forgerPassword}>
                                رمز عبور خود را فراموش کرده‌اید؟
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
