import { useEffect, useReducer, useState } from "react";
import styles from "./Form.module.css";
import Button from "../UI/button/Button";

const Form = function (props) {
  // const [isFormInputValid, setIsformInputValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [userSex, setUserSex] = useState(false);

  const [usersameState, dispatchUsername] = useReducer(
    (state, action) => {
      if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.length > 5 };
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

  //emailinput
  const [emailState, dispatchEmailState] = useReducer(
    (state, action) => {
      if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().includes("@") };
      }
      if (action.type === "USER_BLUR") {
        return {
          value: state.value,
          isValid: state.value.trim().includes("@"),
        };
      }
      if (action.type === "CLEAR_FIELDS") {
        return { value: "", isValid: null };
      }

      return { value: "", isValid: false };
    },
    { value: "", isValid: null }
  );

  const emailChangeHandler = function (e) {
    dispatchEmailState({ type: "USER_INPUT", val: e.target.value });
  };

  const emailBlurHandler = function () {
    dispatchEmailState({ type: "USER_BLUR" });
  };

  //cityState
  const [cityState, dispatchMunicipio] = useReducer(
    (state, action) => {
      if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 5 };
      }
      if (action.type === "USER_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 5 };
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
        return {
          value: action.val,
          isValid: action.val.trim().length > 5,
        };
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

  //sex
  const userSexChangeHandler = function (e) {
    setUserSex(e.target.id);
  };

  const professionChangeChangeHandler = function (e) {
    dispatchProfessionState({ type: "USER_INPUT", val: e.target.value });
  };

  const professionBlurHandler = function () {
    dispatchProfessionState({ type: "USER_BLUR" });
  };

  const removeBigWhiteSpace = function(name){
    const inputValue = name.toLowerCase().replaceAll(/\s+/g, '+').split('+').join(' ').trim();
    const inputValueFormated = inputValue.split(' '); 
    const namesUpper = []
    
    for(const n of inputValueFormated){
      namesUpper.push(n[0].toUpperCase() + n.slice(1));
    }
    return namesUpper.join(' ');
  }

  const addUser = function (e) {
    e.preventDefault();
    removeBigWhiteSpace(usersameState.value)

    const uName = removeBigWhiteSpace(usersameState.value)
    const uEmail = emailState.value.trim();
    const uCity = removeBigWhiteSpace(cityState.value)
    const uProfession = removeBigWhiteSpace(professionState.value)

    if (isFormValid !== true) return;
    let randomID = Math.random().toString(); //RANDOM ID
    fetch("http://localhost:3004/users", {
      method: "POST",
      body: JSON.stringify({
        username: uName,
        email: uEmail,
        city: uCity,
        profession: uProfession,
        id: randomID,
        sex: userSex,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {});

    props.onAddingNewUser(
      uName,
      uEmail,
      uCity,
      uProfession,
      randomID,
      userSex
    );

    dispatchUsername({ type: "CLEAR_FIELDS" });
    dispatchEmailState({ type: "CLEAR_FIELDS" });
    dispatchMunicipio({ type: "CLEAR_FIELDS" });
    dispatchProfessionState({ type: "CLEAR_FIELDS" });
  };

  const { isValid: usernameValid } = usersameState;
  const { isValid: emailValid } = emailState;
  const { isValid: cityValid } = cityState;
  const { isValid: professionValid } = professionState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormValid(
        usernameValid &&
          emailValid &&
          cityValid &&
          professionValid &&
          userSex !== false
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [usernameValid, emailValid, cityValid, professionValid, userSex]);

  return (
    <form id="form" method="post" className={styles.form}>
      <h2>Create Account</h2>
      <div
        className={`${styles.form_control} ${
          (usersameState.isValid === false && styles.invalid) ||
          (usersameState.isValid === true && styles.valid)
        }`}
      >
        <label htmlFor="name"> Username</label>
        <input
          type="text"
          id="name"
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          value={usersameState.value}
        />
      </div>
      <div
        className={`${styles.form_control} ${
          (emailState.isValid === false && styles.invalid) ||
          (emailState.isValid === true && styles.valid)
        }`}
      >
        <label htmlFor="email">E-mail </label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailState.value}
        />
      </div>
      <div
        className={`${styles.form_control} ${
          (cityState.isValid === false && styles.invalid) ||
          (cityState.isValid === true && styles.valid)
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
        className={`${styles.form_control} ${
          (professionState.isValid === false && styles.invalid) ||
          (professionState.isValid === true && styles.valid)
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
      <div className={styles.sex}>
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
        className={`${styles.btn_submit} ${
          isFormValid ? styles.enabled : styles.disabled
        }`}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
