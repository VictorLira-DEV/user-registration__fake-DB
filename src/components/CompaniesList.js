import React, { useState } from "react";
import styles from "../styles/components/CompaniesList/CompaniesList.module.css";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import ProfileOverview from "./UI/ProfileOverview";
import { DiCss3 } from "react-icons/di";
import { DiRuby } from "react-icons/di";
import { AiFillHtml5 } from "react-icons/ai";
import { DiPython } from "react-icons/di";
import { SiJavascript } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import ProfileWrapper from "./UI/ProfileWrapper";

import Button from "./UI/Button";
const CompaniesList = function (props) {
    const [companyHover, setCompanyHover] = useState("");

    let icons = "";
    const displayIcons = function (name) {
        if (name === "Spotify") {
            icons = (
                <React.Fragment>
                    <img className={styles['profile__tech-icon']} src="c++.png" alt="logo" />
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
                </React.Fragment>
            );
        }
        if (name === "Facebook") {
            icons = (
                <React.Fragment>
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
                </React.Fragment>
            );
        }

        if (name === "Google") {
            icons = (
                <React.Fragment>
                    <img className={styles['profile__tech-icon']} src="c++.png" alt="logo" />
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
                </React.Fragment>
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
                    <ProfileWrapper className={styles["profile"]} id={acc.id} key={acc.id}>
                        <div className={styles["profile__company"]}>
                            <img
                                className={styles["profile__image"]}
                                src={`./${acc.img}.png`}
                                alt="avatar"
                            />
                            <div className={styles["profile__home"]}>
                                <HiUserGroup /> <span> {acc.name} </span>
                            </div>
                            <div className={styles["profile__work"]}>
                                <BsFillPersonCheckFill />
                                <span>{acc.year} </span>
                            </div>
                            <div className={styles["profile__tech"]}>
                                {displayIcons(acc.name)}
                                {icons}
                            </div>
                            <Button
                                id={acc.id}
                                onClick={displayCompanyOverview}
                                className={styles["profile__btn-overview"]}
                            >
                                Overview
                            </Button>
                        </div>
                        <ProfileOverview
                            onMouseOutHandler={hideCompanyOverview}
                            className={`${
                                acc.id === companyHover &&
                                styles["profile__overview--hover"]
                            }`}
                        >
                            <h2>Overview</h2>
                            <p className={styles["profile__description"]}>
                                {acc.description}
                            </p>
                        </ProfileOverview>
                    </ProfileWrapper>
                );
            })}
        </React.Fragment>
    );
};

export default CompaniesList;
