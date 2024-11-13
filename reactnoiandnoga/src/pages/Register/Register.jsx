import React, { useState } from "react";
import { addUsers } from "../../functions/postRequest";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";
import "../../register.css";

const Register = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // check if passwords match
    if (password !== verifyPassword) {
      alert("Passwords don't match. retry.");
      return; // exit
    }

    const newUser = {
      username: username,
      website: password,
      email: undefined,
      name: undefined,
      phone: undefined,
      address: {
        street: undefined,
        suite: undefined,
        city: undefined,
        zipcode: undefined,
        geo: {
          lat: undefined,
          lng: undefined,
        },
      },
      company: {
        name: undefined,
        catchPhrase: undefined,
        bs: undefined,
      },
    };

    // sending new user to db
    try {
      const dataBaseWithNewUser = await addUsers(newUser);

      // check if registration was successful
      if (dataBaseWithNewUser) {
        alert("Registration successful, welcome!");
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        setCurrentUser(dataBaseWithNewUser);
        navigate("/register/2"); // Redirect to second registration page for more info
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      alert("Error during registration");
      console.error(err.message);
    }
  };

  return (
    <div className="formContainer">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Submit</button>
    </div>
  );
};

export default Register;
