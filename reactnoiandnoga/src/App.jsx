import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CurrentUserContextProvider from "./context/currentUser";
import {
  getPosts,
  getTodos,
  getAlbums,
  getComments,
  getPhotos,
  getUser,
} from "./functions/getRequest";
import {
  patchComment,
  patchTodo,
  patchPhoto,
  patchAlbum,
  postComment,
} from "./functions/patchRequest";
import {
  deleteComment,
  deleteTodos,
  deleteAlbum,
  deletePhoto,
} from "./functions/deleteRequest";
import {
  addTodos,
  addPosts,
  addAlbums,
  addComments,
  addUsers,
} from "./functions/postRequest";

import Layout from "./components/Layout";
import LayoutSign from "./components/LayoutSign";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import Albums from "./pages/Albums/Albums";
import Todos from "./pages/Todos/Todos";
import Info from "./pages/Info/Info";
import "./App.css";

function App() {
  // -useEffect(() => {
  //   async function fetchUser() {
  //     await getPosts();
  //   }
  //   fetchUser();
  // }, []);

  return (
    <CurrentUserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LayoutSign />}>
            <Route index element={<Login />} />
          </Route>

          <Route path="register" element={<LayoutSign />}>
            <Route index element={<Register />} />
          </Route>

          <Route path="home" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CurrentUserContextProvider>
  );
}
export default App;
