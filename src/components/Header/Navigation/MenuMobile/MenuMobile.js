import React from "react";
import styles from "./MenuMobile.module.css";

import { AiFillFacebook } from "react-icons/ai";
import { IoLogoTwitter } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";

const MenuMobile = (props) => {
    const closeMenuHandler = function (e) {
        e.preventDefault();
        props.onCloseMenu();
    };

    return (
        <nav
            className={`${styles.menu_mobile} ${
                props.menuValid && styles.active
            }`}
        >
            <div>
                <img src="./logo.svg" />
                <img src="./icon-close.svg" onClick={closeMenuHandler} />
            </div>
            <ul>
                <li>Users</li>
                <li>Companies</li>
                <li>Founders</li>
                <li>
                    <div>
                        <AiFillFacebook style={{ fontSize: "25px" }} />
                    </div>
                    <div>
                        <IoLogoTwitter style={{ fontSize: "25px" }} />
                    </div>
                    <div>
                        <AiFillInstagram style={{ fontSize: "25px" }} />
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default MenuMobile;
