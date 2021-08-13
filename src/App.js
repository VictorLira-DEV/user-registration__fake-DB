import React from "react";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";
import CompaniesList from "./components/CompaniesList/CompaniesList";
import Founders from "./components/Founders/Founders";
import Footer from "./components/Footer/Footer";
import ListWrapper from "./components/UI/ListWrapper/ListWrapper";
import { useState, useEffect } from "react";
import InformationModal from "../src/components/InformationModal/InformationList";
import NavContext from "./components/context/navcontext";

function App() {
  const [userListState, setUserListState] = useState([]);
  const [companyListState, setCompanyListState] = useState([]);
  const [foundersListState, setFoundersListState] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalCurrentUser, setModalCurrentUser] = useState({});
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
          setCompanyListState(() => {
            return account;
          });
        }
        if (menu === "users") {
          setUserListState(() => {
            return account;
          });
        }

        if (menu === "founders") {
          setFoundersListState(account);
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
    setUserListState((prev) => {
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
    setUserListState((prev) => {
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

  const menuOption = function (e) {
    menuState(e.target.id);
  };

  const displayInfoModal = function (e) {
    setDisplayModal(true);

    foundersListState.forEach((acc) => {
      if (acc.id === e.target.id) {
        setModalCurrentUser({ name: acc.name, bio: acc.description });
      }
    });
  };

  const closeModal = function () {
    setDisplayModal(false);
  };

  const filter = function (e) {
    fetch(`http://localhost:3004/users?username=${e.target.value}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          setUserListState(json);
        } else {
          let account = [];
          fetch(`http://localhost:3004/users`)
            .then((response) => response.json())
            .then((json) => {
              json.forEach((f) => {
                account.unshift(f);
              });
              setUserListState(() => {
                return account;
              });
            });
        }
      });
  };

  return (
    <React.Fragment>
      <NavContext.Provider
        value={{ onMenuOption: menuOption, onFilter: filter }}
      >
        <Header />
        <div className="wrapper">
          <Form onAddingNewUser={addingNewUser} />
          <ListWrapper>
            {menu === "companies" && <CompaniesList list={companyListState} />}
            {menu === "users" && (
              <UserList list={userListState} onRemoveAccount={removeAccount} />
            )}
            {menu === "founders" && (
              <Founders
                foundersList={foundersListState}
                onDisplayModal={displayInfoModal}
              />
            )}
          </ListWrapper>
        </div>
        <Footer />
      </NavContext.Provider>
      {displayModal && (
        <InformationModal
          onCloseModal={closeModal}
          currentUserModal={modalCurrentUser}
        />
      )}
    </React.Fragment>
  );
}

export default App;
