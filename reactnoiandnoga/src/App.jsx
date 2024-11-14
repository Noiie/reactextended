import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  CurrentUserContextProvider,
  CurrentUserContext,
} from "./context/currentUser";
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

import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  // console.log(useContext(CurrentUserContext));
  // const { currentUser } = useContext(CurrentUserContext);

  // -useEffect(() => {
  //   async function fetchUser() {
  //     await getPosts();
  //   }
  //   fetchUser();
  // }, []);

  return (
    <CurrentUserContextProvider>
      <AppRoutes />
    </CurrentUserContextProvider>
  );
}
export default App;
