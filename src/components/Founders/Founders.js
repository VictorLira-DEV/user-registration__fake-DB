import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { FaSpotify } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import styles from "./Founders.module.css";
import Button from "../UI/button/Button";

const Founders = function (props) {
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
          <AiFillFacebook style={{ color: "blue", background: "white" }} />{" "}
          <span>Facebook </span>
        </>
      );
    }
  };
  return (
    <React.Fragment>
      {props.foundersList.map((acc) => {
        return (
          <li className={styles.founders_list} style={{ color: "white" }}>
            <div className={styles.founders_profile}>
              <img src={`./${acc.img}.jpg`} alt="avatar" />
              <div className={styles.home}>
                <HiUserGroup /> <span> {acc.name} </span>
              </div>
              <div className={styles.work}>
                <FaBirthdayCake /> <span>{acc.year} </span>
              </div>
              <div className={styles.company}>{displayIcons(acc.company)} {icons}</div>
              <Button
                id={acc.id}
                // onClick={displayCompanyOverview}
                className={styles.overview}
              >
                Overview
              </Button>
              <Button
                id={acc.id}
                // onClick={displayCompanyOverview}
                className={styles.about}
              >
                About
              </Button>
            </div>
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default Founders;
