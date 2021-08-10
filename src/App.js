import React from "react";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState([]);

  useEffect(() => {
    let account = [];
    fetch("http://localhost:3004/users")
      .then((response) => response.json())
      .then((json) => {
        json.forEach((f) => {
          account.unshift(f);
        });

        setUsername((prev) => {
          const previous = [...prev];
          previous.forEach((acc) => {
            account.push(acc);
          });
          return account;
        });
      });
  }, []);

  const addingNewUser = function (
    uName,
    uEmail,
    uMunicipio,
    uProfissao,
    randomID,
    userSex
  ) {
    setUsername((prev) => {
      const previous = [...prev];
      previous.unshift({
        username: uName,
        email: uEmail,
        municipio: uMunicipio,
        profession: uProfissao,
        id: randomID,
        sex: userSex,
      });
      return previous;
    });
  };

  const removeAccount = function (e) {
    setUsername((prev) => {
      const previous = [...prev];
      const filtered = previous.filter(
        (acc) => acc.id.toString() !== e.target.id
      );
      return filtered;
    });

    fetch(`http://localhost:3004/users/${e.target.id}`, {
      method: "DELETE",
    });
  };

  return (
    <React.Fragment>
      <Header />
      <div className="wrapper">
        <Form onAddingNewUser={addingNewUser} />
        <UserList list={username} onRemoveAccount={removeAccount} />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
