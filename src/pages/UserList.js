import React, { useState } from "react";
import Button from "../components/Button";
import styles from "../styles/pages/UserList/UserList.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonCheckFill } from "react-icons/bs";
import ProfileOverview from "../components/ProfileOverview";
import ProfileWrapper from "../components/ProfileWrapper";

const UserList = function (props) {
    const [userHover, serUserHover] = useState("");

    const removeAccount = function (e) {
        e.preventDefault();
        props.onRemoveAccount(e)
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
            {console.log(props.list)}
            {props.list.map((acc) => {
                return (
                    <ProfileWrapper
                        key={acc.id}
                        className={styles.profile_wrapper}
                    >
                        <div className={styles.profile}>
                            <img src={`./${acc.sex}.png`} alt="avatar" />
                            <p>{acc.username}</p>
                            <div className={styles.home}>
                                <AiFillHome /> <span>{acc.city} </span>
                            </div>
                            <div className={styles.work}>
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
                            <div className={styles.btns}>
                                <Button
                                    id={acc.id}
                                    className={styles.remove}
                                    onClick={removeAccount}
                                >
                                    Remove
                                </Button>
                                <Button
                                    id={acc.id}
                                    onClick={displayUserOverview}
                                    className={styles.overview}
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
