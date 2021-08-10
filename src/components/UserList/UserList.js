import React from "react";
import Button from "../UI/button/Button";
import styles from "./UserList.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonCheckFill } from "react-icons/bs";

const UserList = function (props) {
  const removeAccount = function (e) {
    e.preventDefault();
    props.onRemoveAccount(e);
  };

  return (
    <React.Fragment>
      {props.list.map((acc) => {
        return (
          <li key={acc.id} className={styles.user_item}>
            <div className={styles.profile}>
              <img src={`./${acc.sex}.jpg`} alt="avatar" />
              <p>{acc.username}</p>
              <div className={styles.home}>
                <AiFillHome /> <span>{acc.city} </span>
              </div>
              <div className={styles.work}>
                <BsFillPersonCheckFill
                  style={{
                    color: `${
                      acc.sex === "male"
                        ? "rgb(127, 177, 253)"
                        : "rgb(228, 155, 224)"
                    }`,
                  }}
                />{" "}
                <span>{acc.profession} </span>
              </div>
              <div className={styles.btns}>
                <Button
                  id={acc.id}
                  className={styles.remove}
                  onClick={removeAccount}
                >
                  Remove user
                </Button>
                <Button id={acc.id} className={styles.overview}>
                  Overview
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default UserList;
