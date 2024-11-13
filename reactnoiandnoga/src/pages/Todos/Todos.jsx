import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/currentUser";
import { getTodos } from "../../functions/getRequest";
import { deleteTodos } from "../../functions/deleteRequest";
import { patchTodo } from "../../functions/patchRequest";
import { addTodos } from "../../functions/postRequest";

function Todos() {
  const { currentUser } = useContext(CurrentUserContext);
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewToName] = useState("");
  // const [sortCriteria, setSortCriteria] = useState("id");
  // const [searchTerm, setSearchTerm] = useState("");

  //get users todos from db
  useEffect(() => {
    async function fetchTodos() {
      try {
        const usersToDosInDB = await getTodos(currentUser.id);
        setTodos(usersToDosInDB);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    }
    fetchTodos();
  }, [currentUser.id]);

  // add new todo
  const functionToAddTodo = async () => {
    if (!newTodoName) return;
    try {
      const newTodo = await addTodos({
        userId: currentUser.id,
        title: newTodoName,
      });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewToName("");
    } catch (error) {
      console.error("failed to add:", error);
    }
  };

  // delete todo
  const functionToDeleteTodo = async (id) => {
    try {
      await deleteTodos(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); //new array that only includes the id's that aren't matched
    } catch (error) {
      console.error("failed to delete:", error);
    }
  };

  // update todo's
  const functionToUpdateTodo = async (id, newTitle) => {
    try {
      await patchTodo(id, { title: newTitle });
      setTodos(
        (
          prevTodos //updating the todos state with a new array. if id matches the todo we want to update, it will creates a new todo object with the updated title
        ) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
          )
      );
    } catch (error) {
      console.error("failed to update:", error);
    }
  };

  // change completion status
  const functionToChangeCompletionStatus = async (id, completed) => {
    try {
      await patchTodo(id, { completed: !completed });
      setTodos(
        (
          prevTodos //updating the todos state with a new array. if id matches the todo we want to make complete/uncomplete, it will creates a new todo object with the updated completion state
        ) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
      );
    } catch (error) {
      console.error("failed to change:", error);
    }
  };

  return (
    <div>
      <h1>Todos</h1>

      {/* Add */}
      <input
        type="text"
        value={newTodoName}
        onChange={(e) => setNewToName(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={functionToAddTodo}>Add Todo</button>

      {/* Todos List */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.id}</span>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => functionToUpdateTodo(todo.id, e.target.value)}
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                functionToChangeCompletionStatus(todo.id, todo.completed)
              }
            />
            <button onClick={() => functionToDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
