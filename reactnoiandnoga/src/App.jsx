import { useState, useEffect } from "react";

import {
  getPosts,
  getTodos,
  getAlbums,
  getComments,
  getPhotos,
  getUser,
} from "./functions/getRequest";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // getPosts();
    // getTodos(1);
    // getAlbums(1);
    // getComments(1);
    // getPhotos(1);
    getUser(1);
  }, []);

  return <></>;
}

export default App;
