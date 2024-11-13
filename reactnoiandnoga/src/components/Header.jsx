import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { CurrentUserContext } from "../context/currentUser";
import logo from "../assets/Noiga.png";

function Header() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <header className="header-container">
      <NavLink to="/home">
        <img id="logo" src={logo} alt="" />
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
