import { useContext, useState, useEffect } from "react";
import { NavLink, useSearchParams, Outlet } from "react-router-dom";

import { CurrentUserContext } from "../../context/currentUser";
import { getPosts, getComments } from "../../functions/getRequest";

function Posts() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const [comments, setComments] = useState({});
  const [postsVisibility, setPostsVisibility] = useState({});
  console.log("comments: ", comments);
  const [posts, setPosts] = useState([]);
  const [textInput, setTextInput] = useState("");

  const postsFilter = searchParams.get("title");

  useEffect(() => {
    async function getUsersPosts() {
      try {
        const response = await getPosts(currentUser.id);
        console.log(response);
        setPosts(response);
        setCommentsVisibility(
          response.reduce((acc, post) => {
            acc[post.id] = false;
            return acc;
          }, {})
        );
        setPostsVisibility(
          response.reduce((acc, post) => {
            acc[post.id] = false;
            return acc;
          }, {})
        );
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

  // comments[post.id][0].name
  const postsElements = displayedPosts.map((post) => (
    <div key={`post-${post.id}`} className="post-container">
      <div className="post-details">
        <h4>{post.title}</h4>
        {postsVisibility[post.id] && <p>Body: {post.body}</p>}
        <p>Id: {post.id}</p>
        <button
          onClick={() =>
            setPostsVisibility((prev) => ({
              ...prev,
              [post.id]: !prev[post.id],
            }))
          }
        >
          {postsVisibility[post.id] ? "Hide post" : "Show post"}
        </button>
        {postsVisibility[post.id] && (
          <button
            onClick={async () => {
              const thisComments = await getComments(post.id);
              // console.log(thisComments);
              setComments((prev) => ({ ...prev, [post.id]: thisComments }));
              setCommentsVisibility((prev) => ({
                ...prev,
                [post.id]: !prev[post.id],
              }));
            }}
          >
            {commentsVisibility[post.id] ? "Hide comments" : "Show comments"}
          </button>
        )}
      </div>

      {commentsVisibility[post.id] && comments[post.id] && (
        <>
          {" "}
          hi
          {comments[post.id].map((comment) => {
            console.log(comment);
            return (
              <div key={`comment-${comment.id}`}>
                <h5>Name: {comment.name}</h5>
                <p>Body: {comment.body}</p>
                <p>Email: {comment.email}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  ));

  function handleInputChange(e) {
    const newTextInput = e.target.value;
    setTextInput(newTextInput);
    setSearchParams({ title: newTextInput });
  }

  return (
    <div>
      <h3>Your Posts:</h3>
      <input
        placeholder="Search for posts..."
        type="text"
        value={textInput}
        onChange={handleInputChange}
      />
      <div className="All-posts-container">
        <div>{postsElements}</div>
      </div>
    </div>
  );
}

export default Posts;
