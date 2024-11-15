import apiRequest from "./apiRequest";
const Api_Url = "http://localhost:3000/";

export async function getPosts(userId) {
  try {
    const request = await fetch(`http://localhost:3000/posts?userId=${userId}`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getAllPosts() {
  try {
    const request = await fetch(`http://localhost:3000/posts`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getPost(postId) {
  try {
    const request = await fetch(`http://localhost:3000/posts?id=${postId}`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getComments(postId) {
  try {
    const request = await fetch(
      `http://localhost:3000/comments?postId=${postId}`
    );
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getTodos(userId) {
  try {
    const request = await fetch(`http://localhost:3000/todos?userId=${userId}`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getAlbums(userId) {
  try {
    const request = await fetch(
      `http://localhost:3000/albums?userId=${userId}`
    );
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    console.log(requestJson);
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getAlbum(albumId) {
  try {
    const request = await fetch(`http://localhost:3000/albums?id=${albumId}`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getPhotos(albumId, start, limit) {
  try {
    const request = await fetch(
      `http://localhost:3000/photos?albumId=${albumId}&_start=${start}&_limit=${limit}`
    );
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getUser(userId) {
  try {
    const request = await fetch(`http://localhost:3000/users?id=${userId}`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getUsers() {
  try {
    const request = await fetch(`http://localhost:3000/users`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getUserAtLogin(username) {
  try {
    const request = await fetch(
      `http://localhost:3000/users?username=${username}`
    );
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}
