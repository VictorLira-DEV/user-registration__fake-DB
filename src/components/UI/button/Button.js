import styles from "./Button.module.css";

const Button = function (props) {
    return (
        <button
            id={props.id}
            onClick={props.onClick}
            className={`${styles.button} ${props.className}`}
        >
            {props.children}
        </button>
    );
};

export default Button;
