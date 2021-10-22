import styles from "../../styles/components/UI/ListWrapper/ListWrapper.module.css";

const ListWrapper = function (props) {
    return <ul className={styles.list_wrapper}>{props.children}</ul>;
};

export default ListWrapper;
