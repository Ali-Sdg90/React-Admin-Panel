import React, { useContext, useEffect, useState } from "react";
import Style from "./HomePage.module.scss";
import { AppContext } from "../../store/AppProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { localToken } = useContext(AppContext);

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
        fetchData();
    }, [localToken]);

    return (
        <div className={Style.container}>
            <h1>HomePage</h1>
        </div>
    );
};

export default HomePage;
