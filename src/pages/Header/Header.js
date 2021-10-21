import styles from "../../styles/pages/Header/Header.module.css";
import logo from '../../assets/images/logo.svg';
import hamburguer from '../../assets/images/icon-hamburger.svg';
import DesktopMenu from "./DesktopMenu";
import MenuMobile from './MenuMobile';
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
            <img className={styles.header_logo} src={logo} alt="logo"/>
            <img className={styles.menu_hamburger} src={hamburguer} onClick={displayMenuMobile} alt="menu-icon"  />
            <DesktopMenu />
            <MenuMobile menuValid={displayMenu} onCloseMenu={closeMenu}  />
        </header>
    );
};

export default Header;
