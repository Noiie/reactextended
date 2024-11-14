// import { apiRequest } from "apiRequest";

let API_URL = "http://localhost:3000/";

export const addTodos = async (obj) => {
  const newTodos = {
    ...obj,
    completed: false,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `http://localhost:3000/todos/`,
    },
    body: JSON.stringify(newTodos),
  };
  try {
    const response = await fetch(`http://localhost:3000/todos/`, postOptions);
    if (!response.ok) throw Error("Couldn't add to-do item");
    const result = await response.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
};

export const addPosts = async (obj) => {
  const newPosts = {
    ...obj,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `http://localhost:3000/posts`,
    },
    body: JSON.stringify(newPosts),
  };
  try {
    const response = await fetch(`http://localhost:3000/posts`, postOptions);
    if (!response.ok) throw Error("Couldn't add post");
    const result = await response.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
};

export const addPhoto = async (obj) => {
  const newPhoto = {
    ...obj,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `http://localhost:3000/photos`,
    },
    body: JSON.stringify(newPhoto),
  };
  try {
    const response = await fetch(`http://localhost:3000/photos`, postOptions);
    if (!response.ok) throw Error("Couldn't add photo");
    const result = await response.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
};

export const addAlbums = async (obj) => {
  const newAlbum = {
    ...obj,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `http://localhost:3000/albums`,
    },
    body: JSON.stringify(newAlbum),
  };
  try {
    const response = await fetch(`http://localhost:3000/albums`, postOptions);
    if (!response.ok) throw Error("Couldn't add post");
    const result = await response.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
};

export const addComments = async (obj) => {
  const newComment = {
    ...obj,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `http://localhost:3000/comments`,
    },
    body: JSON.stringify(newComment),
  };
  try {
    const response = await fetch(`http://localhost:3000/comments`, postOptions);
    if (!response.ok) throw Error("Couldn't add comment");
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    alert(err.message);
  }
};

export const addUsers = async (obj) => {
  const newUser = {
    ...obj,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(newUser),
  };
  try {
    const response = await fetch(`http://localhost:3000/users`, postOptions);
    if (!response.ok)
      throw Error("Couldn't add user. Overpopulation is a thing");
    const result = await response.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
};
