import React from "react";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";
import CompaniesList from "./components/CompaniesList/CompaniesList";
import Footer from "./components/Footer/Footer";
import ListWrapper from "./components/ListWrapper/ListWrapper";
import { useState, useEffect } from "react";

import NavContext from './components/context/navcontext';

function App() {
  const [username, setUsername] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [menu, menuState] = useState("users");
  useEffect(() => {
    let account = [];
    fetch(`http://localhost:3004/${menu}`)
      .then((response) => response.json())
      .then((json) => {
        json.forEach((f) => {
          account.unshift(f);
        });

        if (menu === "companies") {
          setCompaniesList((prev) => {
            return account;
          });
        }
        if (menu === "users") {
          setUsername((prev) => {
            return account;
          });
        }
      });
  }, [menu]);

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
        city: uMunicipio,
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

  const menuOption = function(e){
    menuState(e.target.id)
  }

  return (
    <NavContext.Provider value={{onMenuOption: menuOption}}>
      <Header />
      <div className="wrapper">
        <Form onAddingNewUser={addingNewUser} />
        <ListWrapper>
          {menu === 'companies' && <CompaniesList list={companiesList} />}
          {menu === 'users' &&  <UserList list={username} onRemoveAccount={removeAccount} />}
        </ListWrapper>
      </div>
      <Footer />
    </NavContext.Provider>
  );
}

export default App;
