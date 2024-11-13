import { useState, useEffect, useContext } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CurrentUserContext } from "./context/currentUser";

import Layout from "./components/Layout";
import LayoutSign from "./components/LayoutSign";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Register2 from "./pages/Register/Register2";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import Albums from "./pages/Albums/Albums";
import Todos from "./pages/Todos/Todos";
import Info from "./pages/Info/Info";

function AppRoutes() {
  console.log(useContext(CurrentUserContext));
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LayoutSign />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="register" element={<LayoutSign />}>
          <Route index element={<Register />} />
          <Route path={`2`} element={<Register2 />} />
        </Route>

        <Route path="home" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path={`users/${currentUser.id}/albums`} element={<Layout />}>
          <Route index element={<Albums />} />
        </Route>

        <Route path={`users/${currentUser.id}/posts`} element={<Layout />}>
          <Route index element={<Posts />} />
        </Route>

        <Route path={`users/${currentUser.id}/todos`} element={<Layout />}>
          <Route index element={<Todos />} />
        </Route>

        <Route path={`users/${currentUser.id}/info`} element={<Layout />}>
          <Route index element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
