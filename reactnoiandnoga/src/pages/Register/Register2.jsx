import React, { useState } from "react";
import { patchUserInfo } from "../../functions/patchRequest";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";
import "../../register.css";

function RegisterInfo() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  console.log(currentUser);
  // Form validation
  const validateForm = () => {
    if (name.length < 2) {
      alert("Name must be longer than 1 letter.");
      return false;
    }
    if (phone.length !== 10) {
      alert("Phone number must be 10 digits.");
      return false;
    }
    if (!email.includes("@")) {
      alert("Email is not in a valid format.");
      return false;
    }
    return true; // Validation passed
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedInfo = { name: name, email: email, phone: phone };

      try {
        const updatedUser = await patchUserInfo(currentUser.id, updatedInfo);
        console.log(updatedInfo);
        if (updatedUser) {
          alert(`Welcome ${name}`);
          navigate("/home");
        } else {
          alert("Update failed.");
        }
      } catch (err) {
        alert("Error updating information");
        console.error(err.message);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Care to share?</h1>

          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Phone (10 digits):</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterInfo;
