import apiRequest from "./apiRequest";
const Api_Url = "http://localhost:3000/";

export async function getPosts(userId) {
  try {
    const request = await fetch(`http://localhost:3000/posts`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    console.log(requestJson);
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
    console.log(requestJson);
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
    console.log(requestJson);
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
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
  }
}

export async function getPhotos(albumId) {
  try {
    const request = await fetch(
      `http://localhost:3000/photos?albumId=${albumId}`
    );
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    console.log(requestJson);
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
    console.log(requestJson);
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
