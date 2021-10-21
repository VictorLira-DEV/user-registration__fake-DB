import React, { useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { FaSpotify } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import styles from "../styles/pages/Founders/Founders.module.css";
import Button from "../components/Button";
import ProfileOverview from "../components/ProfileOverview";
import ProfileWrapper from "../components/ProfileWrapper";

// import larry from '../assets/larry.png'

const Founders = function (props) {
    const [hoverEffect, setHoverEffect] = useState("");

    let icons = "";
    const displayIcons = function (currentIcon) {
        if (currentIcon === "Spotify") {
            icons = (
                <>
                    <FaSpotify style={{ color: "rgb(47, 182, 47)" }} />{" "}
                    <span>Spotify </span>
                </>
            );
        }
        if (currentIcon === "Google") {
            icons = (
                <>
                    <FcGoogle /> <span>Google </span>
                </>
            );
        }
        if (currentIcon === "Facebook") {
            icons = (
                <>
                    <AiFillFacebook
                        style={{ color: "blue", background: "white" }}
                    />
                    <span>Facebook </span>
                </>
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
                        className={`${styles.profile_wrapper}`}
                        id={acc.id}
                    >
                        <div className={styles.founders_profile}>
                            <img src={`./${acc.img}.png`} alt="avatar" />
                            <div className={styles.home}>
                                <HiUserGroup /> <span> {acc.name} </span>
                            </div>
                            <div className={styles.work}>
                                <FaBirthdayCake /> <span>{acc.year} </span>
                            </div>
                            <div className={styles.company}>
                                {displayIcons(acc.company)} {icons}
                            </div>
                            <Button
                                onClick={props.onDisplayModal}
                                id={acc.id}
                                className={styles.about}
                            >
                                About
                            </Button>
                            <Button
                                id={acc.id}
                                onClick={displayFoundersOverview}
                                className={styles.overview}
                            >
                                Overview
                            </Button>
                        </div>
                        <ProfileOverview
                            onMouseOutHandler={hideFoundersOverview}
                            className={`${
                                acc.id === hoverEffect &&
                                styles["overview_founders_profile--hover"]
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
