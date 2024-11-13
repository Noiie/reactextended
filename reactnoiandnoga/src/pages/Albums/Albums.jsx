import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";

function Albums() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div>
      <h1>Your albums:</h1>
    </div>
  );
}

export default Albums;
