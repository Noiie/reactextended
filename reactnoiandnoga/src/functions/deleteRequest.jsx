export async function deleteComment(commentId) {
  const postOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("Couldn't delete the comment");
    } else {
      return "Comment deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function deleteTodos(id) {
  const postOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/todos/${id}`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("Couldn't delete the todo");
    } else {
      return "Todo deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function deleteAlbum(id) {
  const postOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/albums/${id}`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("Couldn't delete the album");
    } else {
      return "Album deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function deletePhoto(id) {
  const postOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/photos/${id}`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("Couldn't delete the photo");
    } else {
      return "Photo deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function deleteUser(id) {
  const postOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/users/${id}`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("couldn't delete  user");
    } else {
      return "User deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function deletePost(id) {
  const postOptions = {
    method: "DELETE",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/posts/${id}`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("couldn't delete post");
    } else {
      return "Post deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}
