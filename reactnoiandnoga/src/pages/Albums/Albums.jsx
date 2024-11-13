import { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useSearchParams,
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

import albumIcon from "../../assets/albumIcon.jpg";

function Albums() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useContext(CurrentUserContext);

  const [albums, setAlbums] = useState([]);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const titleFilter = searchParams.get("title");

  useEffect(() => {
    async function getUsersPosts() {
      try {
        const response = await getAlbums(currentUser.id);
        setAlbums(response);
        console.log(response);
      } catch (err) {
        setError(err.message);
      }
    }

    getUsersPosts();
  }, []);

  const displayedAlbums = titleFilter
    ? albums.filter((album) =>
        album.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    : albums;

  if (albums.length === 0) {
    return <div>Loading...</div>;
  }

  const albumsElements = displayedAlbums.map((album) => (
    <>
      <NavLink
        to={`${album.id}/photos`}
        key={`album-${album.id}`}
        className="album-container"
      >
        <div className="album-details">
          <p>Title: {album.title}</p>
          <p>Id: {album.id}</p>
        </div>
        <img src={albumIcon} alt="album icon" />
      </NavLink>
      <button onClick={() => handleDeleteAlbums(album.id)}>Delete album</button>
    </>
  ));

  function handleChange(e) {
    const newTextInput = e.target.value;
    setInputText(newTextInput);
    setSearchParams({ title: inputText });
    setShowResults(true);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setSearchParams({ title: inputText });
  //   setShowResults(true);
  // }

  async function handleDeleteAlbums(albumID) {
    try {
      const deletedAlbum = await deleteAlbum(albumID);
      console.log(deletedAlbum);
      setAlbums((prev) => prev.filter((album) => album.id !== albumID));
    } catch (err) {
      alert("Could not delete the album");
    }
  }

  async function handleAddAlbums() {
    const title = prompt("Album's title:");
    try {
      const newAlbum = await addAlbums({
        title: title,
        userId: currentUser.id,
      });
      setAlbums((prev) => [...prev, newAlbum]);
    } catch (err) {
      alert("Could not add the new album");
    }
  }

  return (
    <div id="Albums">
      <h1>Your albums:</h1>

      {/* <button onClick={handleDeleteAlbums}>Delete album</button> */}
      <button onClick={handleAddAlbums}>Add album</button>

      <form action="GET">
        <input
          placeholder="Search for albums..."
          type="text"
          value={inputText}
          onChange={handleChange}
        />
        {/* <button type="submit">Submit</button> */}
      </form>

      {showResults && <h3>Results for {inputText}...</h3>}
      {showResults && (
        <button
          onClick={() => {
            setSearchParams((prevParams) => prevParams.delete("title"));
            setShowResults(false);
          }}
        >
          clear filter
        </button>
      )}

      <div className="albums-container">{albumsElements}</div>
    </div>
  );
}

export default Albums;
