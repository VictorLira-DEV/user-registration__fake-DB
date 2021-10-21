import React from "react";
import Form from "./pages/Form";
import Header from "./pages/Header/Header";
import UserList from "./pages/UserList";
import CompaniesList from "./pages/CompaniesList";
import Founders from "./pages/Founders";
import Footer from "./pages/Footer";
import ListWrapper from "./components/ListWrapper";
import { useState, useEffect } from "react";
import InformationModal from "./pages/InformationModal";
import NavContext from "./context/navcontext";

function App() {
    const [userListState, setUserListState] = useState([]);
    const [companyListState, setCompanyListState] = useState([]);
    const [foundersListState, setFoundersListState] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);
    const [modalCurrentUser, setModalCurrentUser] = useState({});
    const [menu, menuState] = useState("users");

    useEffect(() => {
        fetch(`http://localhost:3004/users`)
            .then((response) => response.json())
            .then((json) => {
                let account = [];
                json.forEach((f) => {
                    account.unshift(f);
                });

                setUserListState(account);
                return fetch("http://localhost:3004/companies");
            })
            .then((response) => response.json())
            .then((json) => {
                let companies = [];
                json.forEach((f) => {
                    companies.unshift(f);
                });

                setCompanyListState(companies);
                return fetch("http://localhost:3004/founders");
            })
            .then((response) => response.json())
            .then((json) => {
                let founders = [];
                json.forEach((f) => {
                    founders.unshift(f);
                });
                setFoundersListState(founders);
            });
    }, []);

    const addingNewUser = function (
        uName,
        uMunicipio,
        uProfission,
        randomID,
        userSex,
        textArea
    ) {
        setUserListState((prev) => {
            const previous = [...prev];
            previous.unshift({
                username: uName,
                city: uMunicipio,
                profession: uProfission,
                id: randomID,
                sex: userSex,
                overview: textArea,
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

    const [userFilter, setUserState] = useState("");

    const filter = function (e) {
        setUserState(e.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`http://localhost:3004/users?username=${userFilter}`)
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
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [userFilter]);

    return (
        <React.Fragment>
            <NavContext.Provider
                value={{ onMenuOption: menuOption, onFilter: filter }}
            >
                <Header />
                <div className="wrapper">
                    <Form onAddingNewUser={addingNewUser} />
                    <ListWrapper>
                        {menu === "companies" && (
                            <CompaniesList list={companyListState} />
                        )}
                        {menu === "users" && (
                            <UserList
                                list={userListState}
                                onRemoveAccount={removeAccount}
                            />
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
