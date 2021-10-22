import React from "react";
import Form from "./components/Form";
import Header from "./components/Header/Header";
import UserList from "./components/UserList";
import CompaniesList from "./components/CompaniesList";
import Founders from "./components/Founders";
import Footer from "./components/Footer";
import ListWrapper from "./components/UI/ListWrapper";
import { useState, useEffect } from "react";
import InformationModal from "./components/InformationModal";
import NavContext from "./context/navcontext";
import useHttp from "./hooks/useHttp";

function App() {
    const [userListState, setUserListState] = useState([]);
    const [companyListState, setCompanyListState] = useState([]);
    const [foundersListState, setFoundersListState] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);
    const [modalCurrentUser, setModalCurrentUser] = useState({});
    const [menu, menuState] = useState("users");

    const { sendRequest } = useHttp();

    useEffect(() => {
        const receiveUsers = (users) => {
            const usersList = [];
            users.forEach((user) => {
                usersList.unshift(user)
            })

            setUserListState(usersList);
        };

        const receiveCompanies = (companies) => {
            setCompanyListState(companies);
        };

        const receiveFounders = (founders) => {
            setFoundersListState(founders);
        };

        sendRequest({ url: "http://localhost:3004/users" }, receiveUsers);

        sendRequest(
            { url: "http://localhost:3004/companies" },
            receiveCompanies
        );
        sendRequest({ url: "http://localhost:3004/founders" }, receiveFounders);
    }, [sendRequest]);

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

        sendRequest({
            url: `http://localhost:3004/users/${e.target.id}`,
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
                .then((users) => {
                    if (users.length > 0) {
                        setUserListState(users);
                    } else {
                        let account = [];
                        fetch(`http://localhost:3004/users`)
                            .then((response) => response.json())
                            .then((users) => {
                                users.forEach((user) => {
                                    account.unshift(user);
                                });
                                setUserListState(() => {
                                    return account;
                                });
                            });
                    }
                });
        }, 500);

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
