import React, { useState, useContext } from "react";
import { getUserAtLogin } from "../../functions/getRequest";
import { useNavigate, NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUser";

import "../../register.css";

function Login() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  console.log("currentUser: ", currentUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Fetch user that matches the username
      const existingUserInDataBase = await getUserAtLogin(username);
      console.log("existingUserInDataBase: ", existingUserInDataBase);

      if (!existingUserInDataBase.length) {
        alert("User not found, please try again!");
        return;
      }

      if (
        existingUserInDataBase[0].username === username &&
        existingUserInDataBase[0].website === password
      ) {
        alert("Login successful");
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(...existingUserInDataBase)
        );
        setCurrentUser(...existingUserInDataBase);
        navigate("/home");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      alert("Error fetching user data");
    }
  }

  return (
    <div className="wrapper">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <NavLink to="/register">Aren't a member? press to register...</NavLink>
      </div>
    </div>
  );
}

export default Login;
