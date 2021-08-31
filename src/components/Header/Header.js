import styles from "./Header.module.css";
import Navigation from "../Header/Navigation/DesktopMenu/Navigation";
import MenuMobile from './Navigation/MenuMobile/MenuMobile';
import React, {useState} from 'react'
const Header = function () {
const [displayMenu, setDisplayMenu] = useState(false);

const displayMenuMobile = function(e){
    e.preventDefault();
    setDisplayMenu(true);
}

const closeMenu = function(){
    setDisplayMenu(false)
}

    return (
        <header className={styles.header}>
            <img className={styles.header_logo} src="./logo.svg" alt="logo"/>
            <img className={styles.menu_hamburger} src="./icon-hamburger.svg" onClick={displayMenuMobile} alt="menu-icon"  />
            <Navigation />
            <MenuMobile menuValid={displayMenu} onCloseMenu={closeMenu}  />
        </header>
    );
};

export default Header;
