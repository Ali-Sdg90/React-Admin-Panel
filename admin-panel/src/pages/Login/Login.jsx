import React, { useState } from "react";
import Style from "./Login.module.scss";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const formSubmitHandler = (e) => {
        e.preventDefault();

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
