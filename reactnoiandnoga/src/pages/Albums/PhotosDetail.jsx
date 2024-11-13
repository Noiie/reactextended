import { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

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
function PhotosDetail() {
  let { albumId } = useParams();
  const [albumTitle, setAlbumTitle] = useState("Albummmm");
  const [photos, setPhotos] = useState([]);
  const [photosIndex, setPhotosIndex] = useState(0);

  useEffect(() => {
    async function albumDetail() {
      try {
        const thisAlbum = await getAlbum(albumId);
        console.log(thisAlbum);
        setAlbumTitle(thisAlbum.title);
        const responsePhotos = await getPhotos(albumId, photosIndex, 10);
        console.log(responsePhotos);
        setPhotos(responsePhotos);
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
      <img src={photo.thumbnailUrl} />
      <div className="photo-info">
        <h3>{photo.title}</h3>
      </div>
    </div>
  ));

  // setTimeout(() => console.log(albumTitle), 1000);

  return (
    <div>
      <p>Photos of Album {albumTitle}</p>
      <div>{photoElements}</div>
      <button onClick={handleLoadMorePhotos}>Load more photos...</button>
    </div>
  );
}

export default PhotosDetail;
