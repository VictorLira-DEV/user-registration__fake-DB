import "../../styles/components/UI/ProfileOverview/ProfileOverview.css";

const ProfileOverview = function (props) {
    return (
        <div
            className={`profile-overview ${props.className}`}
            onMouseOut={props.onMouseOutHandler}
        >
            {props.children}
        </div>
    );
};



export default ProfileOverview;
