import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";

function Home() {
  const { currentUser } = useContext(CurrentUserContext);
  return <div>{currentUser}</div>;
}

export default Home;
