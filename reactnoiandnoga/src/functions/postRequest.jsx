// import { apiRequest } from "apiRequest";

// const addTodos = async (userId) => {}

// const TodoId = users.length ? users[users.length - 1].id + 1 : 1;
// const newTodo = { id, checked: false,  };
// const listUsers = [...users, newUser];
// setItems(listUsers);

// const postOptions = {
//   method: "POST",
//   headers: {
//     "Content-Type": `${API_URL}/users`,
//   },
//   body: JSON.stringify(newUser),
// };
// const result = await apiRequest(`${API_URL}/users`, postOptions);

// const addPosts = async (postId) => {}

// const addAlbums = async (albumId) => {}

// const addComments = async ({postId}) => {

// }

const Api_Url = "http://localhost:3500/";

export const addusers = async (obj) => {
  const id = Math.random() * 5000;
  const newUser = { ...obj, id: id };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `${Api_Url}/users`,
    },
    body: JSON.stringify(newUser),
  };
  const result = await fetch(`${Api_Url}/users`, postOptions);
};

// export addTodos;
// export addPosts;
// export addAlbums;
// export addComments;
// export addusers;
