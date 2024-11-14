import { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "../../photosalbums.css";
import { CurrentUserContext } from "../../context/currentUser";
import {
  getPosts,
  getTodos,
  getAlbums,
  getAlbum,
  getComments,
  getPhotos,
  getUser,
} from "../../functions/getRequest";

import { deletePhoto } from "../../functions/deleteRequest";

import { addPhoto } from "../../functions/postRequest";

import { patchPhoto } from "../../functions/patchRequest";

function PhotosDetail() {
  let { albumId } = useParams();
  albumId = albumId.toString();
  console.log("albumId: ", albumId);
  const [albumTitle, setAlbumTitle] = useState("Albummmm");
  const [photos, setPhotos] = useState([]);
  const [photosIndex, setPhotosIndex] = useState(0);
  const [photoTitles, setPhotoTitles] = useState({});
  console.log("photoTitles: ", photoTitles);
  const [photoUrls, setPhotosUrls] = useState({});
  console.log("photoUrls: ", photoUrls);
  const [photoEditStatus, setPhotoEditStatus] = useState({});

  useEffect(() => {
    async function albumDetail() {
      try {
        const thisAlbum = await getAlbum(albumId);
        console.log("thisAlbum: ", thisAlbum);
        setAlbumTitle(thisAlbum.title);
        const responsePhotos = await getPhotos(albumId, photosIndex, 10);
        console.log("responsePhotos: ", responsePhotos);
        setPhotos(responsePhotos);
        setPhotoTitles(
          responsePhotos.reduce((acc, photo) => {
            acc[photo.id] = photo.title;
            return acc;
          }, {})
        );
        setPhotosUrls(
          responsePhotos.reduce((acc, photo) => {
            acc[photo.id] = photo.thumbnailUrl;
            return acc;
          }, {})
        );
        setPhotoEditStatus(
          responsePhotos.reduce((acc, photo) => {
            acc[photo.id] = false;
            return acc;
          }, {})
        );
      } catch (err) {
        console.error(err.message);
      }
    }

    albumDetail();
  }, []);

  async function handleLoadMorePhotos() {
    try {
      const newIndex = photosIndex + 10;
      const responsePhotos = await getPhotos(albumId, newIndex, 10);
      console.log("responsePhotos: ", responsePhotos);
      setPhotos((prev) => [...prev, ...responsePhotos]);
      const newTitles = responsePhotos.reduce((acc, photo) => {
        acc[photo.id] = photo.title;
        return acc;
      }, {});
      console.log("newTitles: ", newTitles);
      setPhotoTitles((prev) => ({ ...prev, ...newTitles }));
    } catch (err) {
      console.error(err.message);
    }
  }

  const photoElements = photos.map((photo) => (
    <div
      key={`${photo.id}-${Math.floor(Math.random() * 10000)}`}
      className="photo-container"
    >
      <img src={photoUrls[photo.id]} />
      <div className="photo-info">
        {photoEditStatus[photo.id] ? (
          <>
            <h3>
              Title:{" "}
              <input
                type="text"
                value={photoTitles[photo.id]}
                onChange={(e) => {
                  setPhotoTitles((prev) => ({
                    ...prev,
                    [photo.id]: e.target.value,
                  }));
                }}
              />
            </h3>
            <h3>
              Url:{" "}
              <input
                type="text"
                value={photoUrls[photo.id]}
                onChange={(e) => {
                  setPhotosUrls((prev) => ({
                    ...prev,
                    [photo.id]: e.target.value,
                  }));
                }}
              />
            </h3>
          </>
        ) : (
          <h3>Title: {photoTitles[photo.id]}</h3>
        )}
        {!photoEditStatus[photo.id] && (
          <button
            onClick={() => {
              setPhotoEditStatus((prev) => ({ ...prev, [photo.id]: true }));
            }}
          >
            Edit photo
          </button>
        )}
        {photoEditStatus[photo.id] && (
          <button
            onClick={() => {
              setPhotoEditStatus((prev) => ({ ...prev, [photo.id]: false }));
              patchPhoto(photo.id, {
                title: photoTitles[photo.id],
                thumbnailUrl: photoUrls[photo.id],
              });
            }}
          >
            Save
          </button>
        )}
        <button onClick={() => handleDeletePhoto(photo.id)}>
          Delete photo
        </button>
      </div>
    </div>
  ));

  async function handleDeletePhoto(photoId) {
    try {
      const response = await deletePhoto(photoId);
      setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function handleAddPhoto() {
    const title = prompt("Title");
    const thisUrl = prompt("url");
    try {
      console.log("photos: ", photos);
      const newPhoto = await addPhoto({
        title: title,
        thumbnailUrl: thisUrl,
        albumId: albumId,
      });
      console.log("newPhoto: ", newPhoto);
      setPhotos((prev) => [...prev, newPhoto]);
      setPhotoTitles((prev) => ({
        ...prev,
        [newPhoto.id]: title,
      }));
      setPhotosUrls((prev) => ({
        ...prev,
        [newPhoto.id]: thisUrl,
      }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="photosContainer">
        <button onClick={handleAddPhoto}>Add Photo</button>
        <div>{photoElements}</div>
        <button onClick={handleLoadMorePhotos}>Load more photos...</button>
      </div>
    </div>
  );
}

export default PhotosDetail;
