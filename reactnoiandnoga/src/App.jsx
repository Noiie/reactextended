import { useState, useEffect } from "react";

import {
  getPosts,
  getTodos,
  getAlbums,
  getComments,
  getPhotos,
  getUser,
} from "./functions/getRequest";
import {
  addAlbums,
  addComments,
  addPosts,
  addTodos,
  addusers,
} from "./functions/postRequest";
import "./App.css";

function App() {
  const API_URL = "http://localhost:3000/";

  // useEffect(() => {
  //   // getPosts();
  //   // getTodos(1);
  //   // getAlbums(1);
  //   // getComments(1);
  //   // getPhotos(1);
  //   void getUser(1);
  // }, []);

  // useEffect(() => void addTodos({ title: "title", userId: 1 }), []);
  // useEffect(
  //   () => void addPosts({ title: "title", userId: 1, body: "body" }),
  //   []
  // );
  // useEffect(() => void addAlbums({ title: "title", userId: 1 }), []);

  useEffect(
    () =>
      void addComments({
        name: "noinoga",
        email: "email",
        body: "body",
        userId: 1,
      }),
    []
  );

  useEffect(() => void addusers({}), []);

  return <></>;
}
export default App;
