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

import { patchPhoto } from "../../functions/patchRequest";

function PhotosDetail() {
  let { albumId } = useParams();
  const [albumTitle, setAlbumTitle] = useState("Albummmm");
  const [photos, setPhotos] = useState([]);
  const [photosIndex, setPhotosIndex] = useState(0);
  const [photoTitles, setPhotoTitles] = useState({});
  const [photoUrls, setPhotosUrls] = useState({});
  console.log("photoUrls: ", photoUrls);
  const [photoEditStatus, setPhotoEditStatus] = useState({});

  useEffect(() => {
    async function albumDetail() {
      try {
        const thisAlbum = await getAlbum(albumId);
        console.log(thisAlbum);
        setAlbumTitle(thisAlbum.title);
        const responsePhotos = await getPhotos(albumId, photosIndex, 10);
        console.log(responsePhotos);
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
      console.log(responsePhotos);
      setPhotos((prev) => [...prev, ...responsePhotos]);
    } catch (err) {
      console.error(err.message);
    }
  }

  const photoElements = photos.map((photo) => (
    <div key={photo.id} className="photo-container">
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
      </div>
    </div>
  ));

  // setTimeout(() => console.log(albumTitle), 1000);

  return (
    <div className="photosContainer">
      <div>{photoElements}</div>
      <button className="loadMoreButton" onClick={handleLoadMorePhotos}>
        Load more photos...
      </button>
    </div>
  );
}

export default PhotosDetail;
