import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";

function Info() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div>
      <div>{currentUser.username}</div>
      <div>{currentUser.name}</div>
      <div>{currentUser.email}</div>
      <div>{currentUser.phone}</div>
    </div>
  );
}

export default Info;
