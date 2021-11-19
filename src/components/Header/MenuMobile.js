import React from "react";
import styles from "../../styles/components/header/navigation/MenuMobile/MenuMobile.module.css";
import logo from '../../assets/images/logo.svg'
import closeIcon from '../../assets/images/icon-close.svg'

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
            className={`${styles['nav-mobile']} ${
                props.menuValid && styles['nav-mobile--active']
            }`}
        >
            <div>
                <img src={logo} alt="logo" />
                <img src={closeIcon} onClick={closeMenuHandler} alt="logo-icon" />
            </div>
            <ul className={styles['nav-mobile__list']}>
                <li className={styles['nav-mobile__item']}>Users</li>
                <li className={styles['nav-mobile__item']}>Companies</li>
                <li className={styles['nav-mobile__item']}>Found</li>
                <li className={styles['nav-mobile__item']}>
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
