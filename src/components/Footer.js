import styles from "../styles/Footer/Footer.module.css";
import { ImLocation } from "react-icons/im";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai";
import { IoLogoTwitter } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaReact } from "react-icons/fa";

const Footer = function () {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_logo}>
                <FaReact style={{fontSize: '40px', marginBottom: '20px', color: 'rgb(101, 224, 216)'}}/>
                <h2>Developing Ideas</h2>
            </div>
            <div className={styles.footerWrapper}>
                <div className={styles.footer1}>
                    <div>
                        <ImLocation style={{fontSize: '40px'}}/>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                        </p>
                    </div>
                    <div className={styles.phone}>
                        <div className={styles.cell}>
                            <AiFillPhone />
                            <p>+1-543-123-4567</p>
                        </div>
                        <div className={styles.email}>
                            <MdEmail/>
                            <p>example@fylo.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.footer2}>
                    <ul>
                        <li>About Us</li>
                        <li>Jobs</li>
                        <li>Press</li>
                        <li>Blog</li>
                    </ul>

                    <ul className={styles.terms}>
                        <li>Contact Us</li>
                        <li>Terms</li>
                        <li>Privacy</li>
                    </ul>
                    <div className={styles.social_media}>
                        <div>
                            <AiFillFacebook  style={{fontSize: '25px'}} />
                        </div>
                        <div>
                            <IoLogoTwitter style={{fontSize: '25px'}}  />
                        </div>
                        <div>
                            <AiFillInstagram style={{fontSize: '25px'}} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
