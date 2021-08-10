import styles from './Header.module.css';
import Navigation from './Navigation/Navigation';
const Header = function (){
    return(
        <header className={styles.header}>
            <h2>Header</h2>
            <Navigation/>
        </header>
    )
}

export default Header;