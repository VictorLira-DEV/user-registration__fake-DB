import React, { useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { FaSpotify } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import styles from "../styles/components/Founders/Founders.module.css";
import Button from "./UI/Button";
import ProfileOverview from "./UI/ProfileOverview";
import ProfileWrapper from "./UI/ProfileWrapper";

// import larry from '../assets/larry.png'

const Founders = function (props) {
    const [hoverEffect, setHoverEffect] = useState("");

    let icons = "";
    const displayIcons = function (currentIcon) {
        if (currentIcon === "Spotify") {
            icons = (
                <React.Fragment>
                    <FaSpotify style={{ color: "rgb(47, 182, 47)" }} />{" "}
                    <span>Spotify </span>
                </React.Fragment>
            );
        }
        if (currentIcon === "Google") {
            icons = (
                <React.Fragment>
                    <FcGoogle /> <span>Google </span>
                </React.Fragment>
            );
        }
        if (currentIcon === "Facebook") {
            icons = (
                <React.Fragment>
                    <AiFillFacebook
                        style={{ color: "blue", background: "white" }}
                    />
                    <span>Facebook </span>
                </React.Fragment>
            );
        }
    };

    const displayFoundersOverview = function (e) {
        e.preventDefault();
        setHoverEffect(e.target.id);
    };

    const hideFoundersOverview = function () {
        setHoverEffect("");
    };

    return (
        <React.Fragment>
            {props.foundersList.map((acc) => {
                return (
                    <ProfileWrapper
                        className={`${styles["profile"]}`}
                        id={acc.id}
                        key={acc.id}
                    >
                        <div className={styles["profile__company"]}>
                            <img src={`./${acc.img}.png`} alt="avatar" />
                            <div className={styles["profile__home-icon"]}>
                                <HiUserGroup /> <span> {acc.name} </span>
                            </div>
                            <div className={styles["profile__work-icon"]}>
                                <FaBirthdayCake /> <span>{acc.year} </span>
                            </div>
                            <div className={styles["profile__company-icon"]}>
                                {displayIcons(acc.company)} {icons}
                            </div>
                            <Button
                                onClick={props.onDisplayModal}
                                id={acc.id}
                                className={styles["profile__btn-about"]}
                            >
                                About
                            </Button>
                            <Button
                                id={acc.id}
                                onClick={displayFoundersOverview}
                                className={styles["profile__btn-overview"]}
                            >
                                Overview
                            </Button>
                        </div>
                        <ProfileOverview
                            onMouseOutHandler={hideFoundersOverview}
                            className={`${
                                acc.id === hoverEffect &&
                                styles["profile__overview--hover"]
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

export default Founders;
