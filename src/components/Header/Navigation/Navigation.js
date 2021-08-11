import styles from "./Navigation.module.css";
import React, {useContext} from "react";
import NavContext from "../../context/navcontext";

const Navigation = function () {
 const ctx = useContext(NavContext)

  return (
    <nav>
      <ul className={styles.navigation}>
        <li className={styles.navigation_item} id="users" onClick={ctx.onMenuOption}>
          Users
        </li>
        <li className={styles.navigation_item} id="companies" onClick={ctx.onMenuOption}>
          Companies
        </li>
        <li className={styles.navigation_item} id="founders" onClick={ctx.onMenuOption}>
          Founders
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
