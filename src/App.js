import React from "react";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";
import CompaniesList from "./components/CompaniesList/CompaniesList";
import Founders from './components/Founders/Founders';
import Footer from "./components/Footer/Footer";
import ListWrapper from "./components/ListWrapper/ListWrapper";
import { useState, useEffect } from "react";
import InformationModal from '../src/components/InformationModal/InformationList'
import NavContext from './components/context/navcontext';

function App() {
  const [username, setUsername] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [founders, setFounders] = useState([]);
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
          setCompaniesList((prev) => {
            return account;
          });
        }
        if (menu === "users") {
          setUsername((prev) => {
            return account;
          });
        }

        if(menu === "founders"){
          setFounders(account)
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

  const displayInfoModal = function(e){
    setDisplayModal(true)
    // let name;
    // let content;

    founders.forEach((acc) => {
      if(acc.id === e.target.id){
        setModalCurrentUser({name: acc.name, bio: acc.description})
      }
    })
  }

  const closeModal = function(){
    setDisplayModal(false)
  }

  return (
    <React.Fragment>
      <NavContext.Provider value={{onMenuOption: menuOption}}>
        <Header />
        <div className="wrapper">
          <Form onAddingNewUser={addingNewUser} />
          <ListWrapper>
            {menu === 'companies' && <CompaniesList list={companiesList} />}
            {menu === 'users' &&  <UserList list={username} onRemoveAccount={removeAccount} />}
            {menu === 'founders' &&  <Founders foundersList={founders} onDisplayModal={displayInfoModal} />}
          </ListWrapper>
        </div>
        <Footer />
      </NavContext.Provider>
      {displayModal && <InformationModal onCloseModal={closeModal} currentUserModal={modalCurrentUser}/>}
    </React.Fragment>
  );
}

export default App;
