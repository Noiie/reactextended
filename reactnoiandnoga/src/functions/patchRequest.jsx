export async function patchComment(id, updatedData) {
  const postOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": `http://localhost:3000/comments/${id}`,
    },
    body: JSON.stringify(updatedData),
  };
  try {
    const response = await fetch(
      `http://localhost:3000/comments/${id}`,
      postOptions
    );
    if (!response.ok) throw Error("Couldn't change the comment");

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function patchTodo(id, updatedData) {
  const postOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": `http://localhost:3000/todos/${id}`,
    },
    body: JSON.stringify(updatedData),
  };
  try {
    const response = await fetch(
      `http://localhost:3000/todos/${id}`,
      postOptions
    );
    if (!response.ok) throw Error("Couldn't change the comment");

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function patchPhoto(id, updatedData) {
  const postOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": `http://localhost:3000/photos/${id}`,
    },
    body: JSON.stringify(updatedData),
  };
  try {
    const response = await fetch(
      `http://localhost:3000/photos/${id}`,
      postOptions
    );
    if (!response.ok) throw Error("Couldn't change the comment");

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function patchAlbum(id, updatedData) {
  const postOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": `http://localhost:3000/albums/${id}`,
    },
    body: JSON.stringify(updatedData),
  };
  try {
    const response = await fetch(
      `http://localhost:3000/albums/${id}`,
      postOptions
    );
    if (!response.ok) throw Error("Couldn't change the comment");

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function patchUserInfo(id, updatedInfo) {
  const patchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(updatedInfo),
  };

  try {
    const response = await fetch(
      `http://localhost:3000/users/${id}`,
      patchOptions
    );
    if (!response.ok) throw Error("Couldn't update user information.");
    const result = await response.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
}
