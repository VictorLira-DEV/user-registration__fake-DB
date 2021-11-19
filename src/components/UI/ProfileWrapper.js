import styles from "../../styles/components/UI/ProfileWrapper/ProfileWrapper.module.css";

const ProfileWrapper = function (props) {
    return (
        <li className={`${styles['profile-wrapper']} ${props.className}`}>
            {props.children}
        </li>
    );
};

export default ProfileWrapper;
