import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";
import "../../info.css";

function Info() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profileContainer">
      <div className="profileBox">
        <div className="profileHeader">in case you forgot who you are..</div>
        <div className="profileField ">{currentUser.username}</div>
        <div className="profileField">{currentUser.name}</div>
        <div className="profileField">{currentUser.email}</div>
        <div className="profileField">{currentUser.phone}</div>
      </div>
    </div>
  );
}

export default Info;
