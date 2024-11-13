import { useContext, useState, useEffect } from "react";
import { NavLink, useSearchParams, Outlet } from "react-router-dom";

import { CurrentUserContext } from "../../context/currentUser";
import { getPosts, getComments } from "../../functions/getRequest";
import { deleteComment } from "../../functions/deleteRequest";
import { addComments } from "../../functions/postRequest";
import { patchComment } from "../../functions/patchRequest";

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
  const postsElements = displayedPosts.map((post) => {
    // console.log(post);
    return (
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
            {
              <button onClick={() => handleAddComment(post.id)}>
                Add comment
              </button>
            }
            {comments[post.id].map((comment) => {
              // console.log(comment);
              return (
                <div
                  key={`comment-${comment.id}`}
                  className="comment-container"
                >
                  <h5>Name: {comment.name}</h5>
                  <p>Body: {comment.body}</p>
                  <p>Email: {comment.email}</p>
                  {
                    <button
                      onClick={() => handleDeleteComment(comment.id, post.id)}
                    >
                      Delete comment
                    </button>
                  }
                  {currentUser.email === comment.email && (
                    <button onClick={() => {}}>Edit comment</button>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  });

  async function handleEditComment(commentId) {
    try {
      const updatedComment = await patchComment(commentId);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function handleAddComment(postId) {
    console.log(postId);
    const thisPostId = postId;
    const thisEmail = currentUser.email;
    const commentName = prompt("Name");
    const commentBody = prompt("Body");
    try {
      const response = await addComments({
        postId: thisPostId,
        email: thisEmail,
        name: commentName,
        body: commentBody,
      });
      console.log(response);
      setComments((prev) => ({
        ...prev,
        [postId]: [...prev[postId], response],
      }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function handleDeleteComment(commentId, postId) {
    console.log(commentId);
    try {
      const response = deleteComment(commentId);
      console.log(comments);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== commentId),
      }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

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
