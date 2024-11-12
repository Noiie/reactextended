import { useEffect, useState } from "react";

import { addusers } from "./functions/postRequest";
import "./App.css";

function App() {
  const API_URL = "http://localhost:3000/";

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
