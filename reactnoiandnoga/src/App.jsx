import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { addusers } from "./functions/postRequest";
import "./App.css";

function App() {
  const API_URL = "http://localhost:3000/";
  const [users, setusers] = useState([]);
  const [newUser, setNewUser] = useState("");
  useEffect(() => addusers({}), []);

  return (
    <>
      {/* <postRequest
        users={users}
        setusers={setusers}
        newUser={newUser}
        setnewUser={setNewUser}
        handleSubmit={handleSubmit}
      /> */}
    </>
  );
}

export default App;
