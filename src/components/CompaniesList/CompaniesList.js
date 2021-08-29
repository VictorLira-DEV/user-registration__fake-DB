import React, { useState } from "react";
import styles from "./CompaniesList.module.css";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import ProfileOverview from "../UI/ProfileOverview/ProfileOverview";
import { DiCss3 } from "react-icons/di";
import { DiRuby } from "react-icons/di";
import { AiFillHtml5 } from "react-icons/ai";
import { DiPython } from "react-icons/di";
import { SiJavascript } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import ProfileWrapper from "../UI/ProfileWrapper/ProfileWrapper";


import Button from "../UI/button/Button";
const CompaniesList = function (props) {
    const [companyHover, setCompanyHover] = useState("");

    let icons = "";
    const displayIcons = function (name) {
        if (name === "Spotify") {
            icons = (
                <>
                    <img className={styles.tech_img} src="c++.png" alt="logo" />
                    <DiRuby
                        style={{
                            color: "rgb(224, 166, 162)",
                            fontSize: "1.5rem",
                        }}
                    />
                    <SiJavascript
                        style={{ color: "yellow", fontSize: "1.5rem" }}
                    />
                    <AiFillHtml5
                        style={{
                            color: "rgb(253, 114, 0)",
                            fontSize: "1.5rem",
                        }}
                    />
                    <DiCss3
                        style={{
                            color: "rgb(56, 170, 247)",
                            fontSize: "1.5rem",
                        }}
                    />
                </>
            );
        }
        if (name === "Facebook") {
            icons = (
                <>
                    <FaReact
                        style={{
                            color: "rgb(74, 213, 254)",
                            fontSize: "1.5rem",
                        }}
                    />
                    <SiJavascript
                        style={{ color: "yellow", fontSize: "1.5rem" }}
                    />
                    <SiTypescript
                        style={{
                            color: "rgb(45, 121, 199)",
                            fontSize: "1.5rem",
                        }}
                    />
                    <AiFillHtml5
                        style={{
                            color: "rgb(253, 114, 0)",
                            fontSize: "1.5rem",
                        }}
                    />
                    <DiCss3
                        style={{
                            color: "rgb(56, 170, 247)",
                            fontSize: "1.5rem",
                        }}
                    />
                </>
            );
        }

        if (name === "Google") {
            icons = (
                <>
                    <img className={styles.tech_img} src="c++.png" alt="logo" />
                    <DiPython style={{ color: "yellow", fontSize: "1.5rem" }} />
                    <SiJavascript
                        style={{ color: "yellow", fontSize: "1.5rem" }}
                    />
                    <AiFillHtml5
                        style={{
                            color: "rgb(253, 114, 0)",
                            fontSize: "1.5rem",
                        }}
                    />
                    <DiCss3
                        style={{
                            color: "rgb(56, 170, 247)",
                            fontSize: "1.5rem",
                        }}
                    />
                </>
            );
        }
    };

    const displayCompanyOverview = function (e) {
        e.preventDefault();
        setCompanyHover(e.target.id);
    };

    const hideCompanyOverview = function () {
        setCompanyHover("");
    };

    return (
        <React.Fragment>
            {props.list.map((acc) => {
                return (
                    <ProfileWrapper
                        className={styles.profile_wrapper}
                        id={acc.id}
                    >
                        <div className={styles.company_profile}>
                            <img src={`./${acc.img}.png`} alt="avatar" />
                            <div className={styles.home}>
                                <HiUserGroup /> <span> {acc.name} </span>
                            </div>
                            <div className={styles.work}>
                                <BsFillPersonCheckFill />
                                <span>{acc.year} </span>
                            </div>
                            <div className={styles.tech}>
                                {displayIcons(acc.name)}
                                {icons}
                            </div>
                            <Button
                                id={acc.id}
                                onClick={displayCompanyOverview}
                                className={styles.overview}
                            >
                                Overview
                            </Button>
                        </div>
                        <ProfileOverview
                            onMouseOutHandler={hideCompanyOverview}
                            className={`${
                                acc.id === companyHover &&
                                styles["overview_company_profile--hover"]
                            }`}
                        >
                            <h2>Overview</h2>
                            <p>{acc.description}</p>
                        </ProfileOverview>
                    </ProfileWrapper>
                );
            })}
        </React.Fragment>
    );
};

export default CompaniesList;
