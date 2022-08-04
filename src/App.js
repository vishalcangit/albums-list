import { useState } from "react";
import Albums from "./components/Albums";

function App() {
  const [albums, setAlbums] = useState([]);

  async function fetchAlbumsHandler() {
    let response = await fetch('https://jsonplaceholder.typicode.com/albums');
    let data = await response.json();
    setAlbums(data);
  }
  console.log(albums);

  async function deleteAlbumHandler(id) {
    setAlbums(
      albums.filter((album) => {
        return album.id !== id
      })
    )
    console.log(id);
    console.log(albums);
  }

  return (
    <div>
      <button onClick={fetchAlbumsHandler}>Fetch albums</button>
      <Albums albums={albums} deleteAlbum={deleteAlbumHandler} />
    </div>
  );
}

export default App;
