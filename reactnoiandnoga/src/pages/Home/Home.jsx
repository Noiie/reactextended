import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";

function Home() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(useContext(CurrentUserContext));
  return <div>{currentUser.name}</div>;
}

export default Home;
