import { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useSearchParams,
} from "react-router-dom";

import { CurrentUserContext } from "../../context/currentUser";
import {
  getPosts,
  getTodos,
  getAlbums,
  getComments,
  getPhotos,
  getUser,
} from "../../functions/getRequest";

import { addAlbums } from "../../functions/postRequest";

import { deleteAlbum } from "../../functions/deleteRequest";

import albumIcon from "../../assets/albumIcon.jpg";

function Posts() {
  let [searchParams, setSearchParams] = useSearchParams();

  const { currentUser } = useContext(CurrentUserContext);
  const [posts, setPosts] = useState([]);
  const [textInput, setTextInput] = useState("");

  const postsFilter = searchParams.get("title");

  useEffect(() => {
    async function getUsersPosts() {
      try {
        const response = await getPosts(currentUser.id);
        console.log(response);
        setPosts(response);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }

    getUsersPosts();
  }, []);

  const displayedPosts = postsFilter
    ? posts.filter((post) =>
        posts.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    : posts;

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  const postsElements = displayedPosts.map((post) => (
    <>
      <NavLink
        to={`${post.id}`}
        key={`post-${post.id}`}
        className="post-container"
      >
        <div className="post-details">
          <p>Title: {post.title}</p>
          <p>Id: {post.id}</p>
        </div>
        {/* <img src={albumIcon} alt="album icon" /> */}
      </NavLink>
    </>
  ));

  return (
    <div>
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <div>{postsElements}</div>
    </div>
  );
}

export default Posts;
