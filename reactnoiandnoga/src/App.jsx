import { useState, useEffect } from "react";

import {
  getPosts,
  getTodos,
  getAlbums,
  getComments,
  getPhotos,
  getUser,
} from "./functions/getRequest";
import { addusers } from "./functions/postRequest";
import "./App.css";

function App() {
  const API_URL = "http://localhost:3000/";

  useEffect(() => {
    // getPosts();
    // getTodos(1);
    // getAlbums(1);
    // getComments(1);
    // getPhotos(1);
    getUser(1);
  }, []);

  useEffect(() => addusers({}), []);

  return <></>;
}
export default App;
