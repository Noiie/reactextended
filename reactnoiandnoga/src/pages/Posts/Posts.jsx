import { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useSearchParams,
  Outlet,
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

function Posts() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [commentsShowed, setCommentsShowed] = useState(false);
  const [posts, setPosts] = useState([]);
  const [textInput, setTextInput] = useState("");

  const postsFilter = searchParams.get("title");
  // const postsFilter = searchParams.get("title");

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
        post.title.toLowerCase().includes(textInput.toLowerCase())
      )
    : posts;

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  const postsElements = displayedPosts.map((post) => (
    <div key={`post-${post.id}`} className="post-container">
      <div className="post-details">
        <p>Title: {post.title}</p>
        <p>Id: {post.id}</p>
        <NavLink to={`${post.id}/comments`}>
          {commentsShowed ? "Hide comments" : "Show comments"}
        </NavLink>
      </div>

      <Outlet context={{ currentPostId: post.id }} />
    </div>
  ));

  function handleInputChange(e) {
    const newTextInput = e.target.value;
    setTextInput(newTextInput);
    setSearchParams({ title: newTextInput });
  }

  return (
    <div>
      <input type="text" value={textInput} onChange={handleInputChange} />
      <div>{postsElements}</div>
    </div>
  );
}

export default Posts;
