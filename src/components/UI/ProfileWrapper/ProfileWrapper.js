import styles from './ProfileWrapper.module.css'

const ProfileWrapper = function(props){
    return(
        <li className={`${styles.profile_wrapper} ${props.className}`}>
            {props.children}
        </li>
    )
}

export default ProfileWrapper;
