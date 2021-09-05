import styles from "../../styles/Header/Navigation/DesktopMenu/DesktopMenu.module.css";
import React, { useContext } from "react";
import NavContext from "../context/navcontext";

const DesktopMenu = function () {
    const ctx = useContext(NavContext);

    return (
        <nav className={styles.nav_desktop}>
            <ul className={styles.desktop_menu}>
                <li
                    className={styles.navigation_item}
                    id="users"
                    onClick={ctx.onMenuOption}
                >
                    Users
                </li>
                <li
                    className={styles.navigation_item}
                    id="companies"
                    onClick={ctx.onMenuOption}
                >
                    Companies
                </li>
                <li
                    className={styles.navigation_item}
                    id="founders"
                    onClick={ctx.onMenuOption}
                >
                    Founders
                </li>
                <li className={styles.navigation_item}>
                    <input
                        onChange={ctx.onFilter}
                        type="search"
                        placeholder="Search user"
                    />
                </li>
            </ul>
        </nav>
    );
};

export default DesktopMenu;