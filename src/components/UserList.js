import React, { useState } from "react";
import Button from "./UI/Button";
import styles from "../styles/components/UserList/UserList.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonCheckFill } from "react-icons/bs";
import ProfileOverview from "./UI/ProfileOverview";
import ProfileWrapper from "./UI/ProfileWrapper";

const UserList = function (props) {
    const [userHover, serUserHover] = useState("");

    const removeAccount = function (e) {
        e.preventDefault();
        props.onRemoveAccount(e);
    };

    const displayUserOverview = function (e) {
        e.preventDefault();
        serUserHover(e.target.id);
    };

    const mouseOutHandler = function (e) {
        serUserHover("");
    };

    return (
        <React.Fragment>
            {props.list.map((acc) => {
                return (
                    <ProfileWrapper key={acc.id} className={styles["profile"]}>
                        <div className={styles["profile__users"]}>
                            <img src={`./${acc.sex}.png`} alt="avatar" />
                            <p>{acc.username}</p>
                            <div className={styles["profile__home-icon"]}>
                                <AiFillHome /> <span>{acc.city} </span>
                            </div>
                            <div className={styles["profile__work-icon"]}>
                                <BsFillPersonCheckFill
                                    style={{
                                        color: `${
                                            acc.sex === "male"
                                                ? "rgb(21, 200, 255)"
                                                : "rgb(227, 56, 250)"
                                        }`,
                                    }}
                                />
                                <span>{acc.profession} </span>
                            </div>
                            <div>
                                <Button
                                    id={acc.id}
                                    className={
                                        styles["profile__btn-remove-user"]
                                    }
                                    onClick={removeAccount}
                                >
                                    Remove
                                </Button>
                                <Button
                                    id={acc.id}
                                    onClick={displayUserOverview}
                                    className={styles["profile__btn-overview"]}
                                >
                                    Overview
                                </Button>
                            </div>
                        </div>
                        <ProfileOverview
                            onMouseOutHandler={mouseOutHandler}
                            className={` ${
                                acc.id === userHover &&
                                styles["overview_profile--hover"]
                            }`}
                        >
                            <h2>Overview</h2>
                            <p>{acc.overview}</p>
                        </ProfileOverview>
                    </ProfileWrapper>
                );
            })}
        </React.Fragment>
    );
};

export default UserList;
