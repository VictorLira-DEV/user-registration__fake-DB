import styles from "../../styles/components/header/navigation/DesktopMenu/DesktopMenu.module.css";
import React, { useContext } from "react";
import NavContext from "../../context/navcontext";

const DesktopMenu = function () {
    const ctx = useContext(NavContext);

    return (
        <nav className={styles["nav-desktop"]}>
            <ul className={styles["nav-desktop__list"]}>
                <li
                    className={styles["nav-desktop__item"]}
                    id="users"
                    onClick={ctx.onMenuOption}
                >
                    Users
                </li>
                <li
                    className={styles["nav-desktop__item"]}
                    id="companies"
                    onClick={ctx.onMenuOption}
                >
                    Companies
                </li>
                <li
                    className={styles["nav-desktop__item"]}
                    id="founders"
                    onClick={ctx.onMenuOption}
                >
                    Founders
                </li>
                <li className={styles["nav-desktop__item"]}>
                    <input
                        onChange={ctx.onFilter}
                        type="search"
                        placeholder="Search user"
                        className={styles['nav-desktop__search']}
                    />
                </li>
            </ul>
        </nav>
    );
};

export default DesktopMenu;
