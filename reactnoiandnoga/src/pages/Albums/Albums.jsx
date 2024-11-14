import { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useSearchParams,
} from "react-router-dom";
import "../../Albums.css";
import { CurrentUserContext } from "../../context/currentUser";
import { patchAlbum } from "../../functions/patchRequest";
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
  const [albumsEditStatus, setAlbumsEditStatus] = useState({});
  const [titleText, setTitleText] = useState("");
  console.log("titleText: ", titleText);

  const titleFilter = searchParams.get("title");

  useEffect(() => {
    async function getUsersPosts() {
      try {
        const response = await getAlbums(currentUser.id);
        setAlbums(response);
        console.log(response);
        setTitleText(
          response.reduce((acc, album) => {
            acc[album.id] = album.title;
            return acc;
          }, {})
        );
        setAlbumsEditStatus(
          response.reduce((acc, album) => {
            acc[album.id] = false;
            return acc;
          }, {})
        );
      } catch (err) {
        setError(err.message);
      }
    }

    getUsersPosts();
  }, []);

  const displayedAlbums = titleFilter
    ? albums.filter((album) => {
        album = album.title ? album : {};
        console.log(album.title);
        console.log(inputText);
        return album.title.toLowerCase().includes(inputText.toLowerCase());
      })
    : albums;

  if (albums.length === 0) {
    return <div>Loading...</div>;
  }

  const albumsElements = displayedAlbums.map((album) => (
    <div key={`album-${album.id}`}>
      <NavLink
        to={`${album.id}/photos`}
        key={`album-${album.id}`}
        className={`album-container ${
          albumsEditStatus[album.id] ? "disabled" : ""
        }`}
        onClick={(e) => {
          if (albumsEditStatus[album.id]) e.preventDefault();
        }}
      >
        <div className="album-details">
          {albumsEditStatus[album.id] ? (
            <p>
              Title:{" "}
              <input
                type="text"
                value={titleText[album.id]}
                onChange={(e) => {
                  setTitleText((prev) => ({
                    ...prev,
                    [album.id]: e.target.value,
                  }));
                }}
              />
              <button
                onClick={() => {
                  setAlbumsEditStatus((prev) => ({
                    ...prev,
                    [album.id]: false,
                  }));
                  const newTitle = titleText[album.id];
                  patchAlbum(album.id, { title: newTitle });
                }}
              >
                Save
              </button>
            </p>
          ) : (
            <p>Title: {titleText[album.id]}</p>
          )}
          <p>Id: {album.id}</p>
        </div>
        <img src={albumIcon} alt="album icon" />
      </NavLink>
      <button onClick={() => handleDeleteAlbums(album.id)}>Delete album</button>
      <button onClick={() => handleEditAlbums(album.id)}>Edit album</button>
    </div>
  ));

  function handleEditAlbums(albumId) {
    setAlbumsEditStatus((prev) => ({ ...prev, [albumId]: true }));
  }

  function handleChange(e) {
    const newTextInput = e.target.value;
    setInputText(newTextInput);
    setSearchParams({ title: newTextInput });
    setShowResults(true);
  }

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
    <div className="albumsContainer">
      <div className="albumsBox">
        <button onClick={handleAddAlbums}>Add album</button>

        <form action="GET">
          <input
            placeholder="Search for albums..."
            type="text"
            value={inputText}
            onChange={handleChange}
            className="inputField"
          />
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

        <div className="albumsList">
          {displayedAlbums.map((album) => (
            <div key={`album-${album.id}`} className="albumItem">
              <NavLink
                to={`${album.id}/photos`}
                className={`album-container ${
                  albumsEditStatus[album.id] ? "disabled" : ""
                }`}
                onClick={(e) => {
                  if (albumsEditStatus[album.id]) e.preventDefault();
                }}
              >
                <div className="albumDetails">
                  {albumsEditStatus[album.id] ? (
                    <p>
                      Title:{" "}
                      <input
                        type="text"
                        value={titleText[album.id]}
                        onChange={(e) => {
                          setTitleText((prev) => ({
                            ...prev,
                            [album.id]: e.target.value,
                          }));
                        }}
                      />
                      <button
                        onClick={() => {
                          setAlbumsEditStatus((prev) => ({
                            ...prev,
                            [album.id]: false,
                          }));
                          const newTitle = titleText[album.id];
                          patchAlbum(album.id, { title: newTitle });
                        }}
                      >
                        Save
                      </button>
                    </p>
                  ) : (
                    <p className="albumTitle">Title: {titleText[album.id]}</p>
                  )}
                  <p className="albumId">Id: {album.id}</p>
                </div>
                <img src={albumIcon} alt="album icon" className="albumIcon" />
              </NavLink>
              <div className="albumButtons">
                <button onClick={() => handleDeleteAlbums(album.id)}>
                  Delete album
                </button>
                <button onClick={() => handleEditAlbums(album.id)}>
                  Edit album
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Albums;
