import { useEffect, useReducer, useState } from "react";
import { removeBigWhiteSpace } from "../helper/reusableFunctions";
import styles from "../styles/components/Form/Form.module.css";
import Button from "./UI/Button";
import { v4 as uuid } from "uuid";

const Form = function (props) {
    const [isFormValid, setIsFormValid] = useState(false);
    const [userSex, setUserSex] = useState(false);

    const [usernameState, dispatchUsername] = useReducer(
        (state, action) => {
            if (action.type === "USER_INPUT") {
                return { value: action.val, isValid: state.isValid };
            }
            if (action.type === "USER_BLUR") {
                return { value: state.value, isValid: state.value.length > 5 };
            }
            if (action.type === "CLEAR_FIELDS") {
                return { value: "", isValid: null };
            }

            return { value: "", isValid: false };
        },
        { value: "", isValid: null }
    );

    const usernameChangeHandler = function (e) {
        dispatchUsername({ type: "USER_INPUT", val: e.target.value });
    };

    const usernameBlurHandler = function () {
        dispatchUsername({ type: "USER_BLUR" });
    };

    //cityState
    const [cityState, dispatchMunicipio] = useReducer(
        (state, action) => {
            if (action.type === "USER_INPUT") {
                return { value: action.val, isValid: state.isValid };
            }
            if (action.type === "USER_BLUR") {
                return {
                    value: state.value,
                    isValid: state.value.trim().length > 5,
                };
            }
            if ((action.type = "CLEAR_FIELDS")) {
                return { value: "", isValid: null };
            }

            return { value: "", isValid: false };
        },
        { value: "", isValid: null }
    );

    const municipioChangeHandler = function (e) {
        dispatchMunicipio({ type: "USER_INPUT", val: e.target.value });
    };

    const municipioBlurHandler = function () {
        dispatchMunicipio({ type: "USER_BLUR" });
    };

    //profession
    const [professionState, dispatchProfessionState] = useReducer(
        (state, action) => {
            if (action.type === "USER_INPUT") {
                return { value: action.val, isValid: state.isValid };
            }
            if (action.type === "USER_BLUR") {
                return {
                    value: state.value,
                    isValid: state.value.trim().length > 5,
                };
            }
            if (action.type === "CLEAR_FIELDS") {
                return { value: "", isValid: null };
            }

            return { value: "", isValid: false };
        },
        { value: "", isValid: null }
    );

    const professionChangeChangeHandler = function (e) {
        dispatchProfessionState({ type: "USER_INPUT", val: e.target.value });
    };

    const professionBlurHandler = function () {
        dispatchProfessionState({ type: "USER_BLUR" });
    };

    //text area
    const [textAreaState, dispatchTextAreaState] = useReducer(
        (state, action) => {
            if (action.type === "USER_INPUT") {
                return action.val;
            }
            if (action.type === "CLEAR_FIELDS") {
                return "";
            }

            return "";
        },
        ""
    );

    const textAreaChangeHandler = function (e) {
        dispatchTextAreaState({ type: "USER_INPUT", val: e.target.value });
    };

    //sex
    const userSexChangeHandler = function (e) {
        setUserSex(e.target.id);
    };

    const addUser = function (e) {
        e.preventDefault();
        if (isFormValid !== true) return;

        const uName = removeBigWhiteSpace(usernameState.value);
        const uCity = removeBigWhiteSpace(cityState.value);
        const uProfession = removeBigWhiteSpace(professionState.value);
        let randomID = uuid();

        fetch("http://localhost:3004/users", {
            method: "POST",
            body: JSON.stringify({
                username: uName,
                overview: textAreaState.trim(),
                city: uCity,
                profession: uProfession,
                id: randomID,
                sex: userSex,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        props.onAddingNewUser(
            uName,
            uCity,
            uProfession,
            randomID,
            userSex,
            textAreaState.trim()
        );

        dispatchUsername({ type: "CLEAR_FIELDS" });
        dispatchMunicipio({ type: "CLEAR_FIELDS" });
        dispatchProfessionState({ type: "CLEAR_FIELDS" });
        dispatchTextAreaState({ type: "CLEAR_FIELDS" });
    };

    const { isValid: usernameValid } = usernameState;
    const { isValid: cityValid } = cityState;
    const { isValid: professionValid } = professionState;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFormValid(
                usernameValid &&
                    cityValid &&
                    professionValid &&
                    userSex !== false
            );
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [usernameValid, cityValid, professionValid, userSex]);

    return (
        <form id="form" method="post" className={styles["main-form"]}>
            <h2>Create Account</h2>
            <div
                className={`${styles["main-form__control"]} ${
                    (usernameState.isValid === false &&
                        styles["main-form__control--invalid"]) ||
                    (usernameState.isValid === true &&
                        styles["main-form__control--valid"])
                }`}
            >
                <label htmlFor="name"> Username</label>
                <input
                    type="text"
                    id="name"
                    onChange={usernameChangeHandler}
                    onBlur={usernameBlurHandler}
                    value={usernameState.value}
                />
            </div>
            <div
                className={`${styles["main-form__control"]} ${
                    (cityState.isValid === false &&
                        styles["main-form__control--invalid"]) ||
                    (cityState.isValid === true &&
                        styles["main-form__control--valid"])
                }`}
            >
                <label htmlFor="municipio"> City </label>
                <input
                    type="text"
                    id="municipio"
                    onChange={municipioChangeHandler}
                    onBlur={municipioBlurHandler}
                    value={cityState.value}
                />
            </div>
            <div
                className={`${styles["main-form__control"]} ${
                    (professionState.isValid === false &&
                        styles["main-form__control--invalid"]) ||
                    (professionState.isValid === true &&
                        styles["main-form__control--valid"])
                }`}
            >
                <label htmlFor="password2"> Profession</label>
                <input
                    type="text"
                    id="password2"
                    onChange={professionChangeChangeHandler}
                    onBlur={professionBlurHandler}
                    value={professionState.value}
                />
            </div>
            <div className={styles["main-form__control"]}>
                <label>About you</label>
                <textarea
                    value={textAreaState}
                    row="6"
                    placeholder="let us know something about you"
                    onChange={textAreaChangeHandler}
                ></textarea>
            </div>
            <div className={styles['main-form__sex-field']}>
                <div>
                    <label htmlFor="tMas">Masculino</label>
                    <input
                        type="radio"
                        name="tSex"
                        id="male"
                        onChange={userSexChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="tFem">Feminino</label>
                    <input
                        type="radio"
                        name="tSex"
                        id="female"
                        onChange={userSexChangeHandler}
                    />
                </div>
            </div>
            <Button
                onClick={addUser}
                className={`${styles['main-form__btn-submit']} ${
                    isFormValid ? styles['main-form__btn-submit--enabled'] : styles['main-form__btn-submit--disabled']
                }`}
            >
                Submit
            </Button>
        </form>
    );
};

export default Form;
