import styles from "./Header.module.css";
import Navigation from "./Navigation/Navigation";
const Header = function () {
    return (
        <header className={styles.header}>
            <img src="./logo.svg"></img>
            <Navigation />
        </header>
    );
};

export default Header;
