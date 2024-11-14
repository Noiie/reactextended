import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/currentUser";
import logo from "../assets/Noiga.png";

function Header() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      localStorage.clear();
      setCurrentUser(null);
      navigate("login");
      // location.reload();
      alert("Logged out, come back soon :)");
    } catch (err) {
      console.error("Failed to log out:", err);
      alert("Failed to log out");
    }
  };
  console.log("currentUser in header: ", currentUser);

  return (
    <header className="header-container">
      <NavLink to="/home">
        <img id="logo" src={logo} alt="Logo" />
      </NavLink>
      <nav>
        <NavLink
          to={`/users/${currentUser.id}/albums`}
          className={({ isActive }) =>
            (isActive ? "activeNav" : "") + " navLink"
          }
        >
          Albums
        </NavLink>
        <NavLink
          to={`/users/${currentUser.id}/posts`}
          className={({ isActive }) =>
            (isActive ? "activeNav" : "") + " navLink"
          }
        >
          Post
        </NavLink>
        <NavLink
          to={`/users/${currentUser.id}/todos`}
          className={({ isActive }) =>
            (isActive ? "activeNav" : "") + " navLink"
          }
        >
          Todos
        </NavLink>
        <NavLink
          to="/login"
          onClick={handleLogOut}
          className={({ isActive }) =>
            (isActive ? "activeNav" : "") + " navLink"
          }
        >
          Logout
        </NavLink>
        <section className="personal-nav">
          <NavLink
            to={`/users/${currentUser.id}/info`}
            className={({ isActive }) =>
              (isActive ? "activeNav" : "") + " navLink"
            }
          >
            Info
          </NavLink>
          <p>{currentUser.name}</p>
        </section>
      </nav>
    </header>
  );
}

export default Header;
