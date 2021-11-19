import React from "react";
import ReactPORTAL from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import "../styles/components/InformationModal/InformationModal.css";

const Backdrop = () => {
    return <div className="backdrop"></div>;
};

const Modal = function (props) {
    return (
        <div className="modal active" onClick={props.onCloseModal}>
            <header className="modal__header">
                <h3>Learn more</h3>
                <div>
                    <AiFillCloseCircle />
                </div>
            </header>
            <section className="modal__body">
                <h1>{props.currentUserModal.name}</h1>
                <p>{props.currentUserModal.bio}</p>
                <p>Font: wikipedia.com</p>
            </section>
        </div>
    );
};

const InformationModal = function (props) {
    return (
        <React.Fragment>
            {ReactPORTAL.createPortal(
                <Backdrop />,
                document.getElementById("backdrop-root")
            )}
            {ReactPORTAL.createPortal(
                <Modal
                    onCloseModal={props.onCloseModal}
                    currentUserModal={props.currentUserModal}
                />,
                document.getElementById("overlay-root")
            )}
        </React.Fragment>
    );
};

export default InformationModal;
