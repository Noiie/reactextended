import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import "./App.css";

function App() {
  -useEffect(() => {
    async function fetchUser() {
      await getPosts();
    }
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Layout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="register" element={<Layout />}>
          <Route index element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
