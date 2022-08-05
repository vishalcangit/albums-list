import { useState } from "react";
import AddAlbum from "./components/AddAlbum";
import Albums from "./components/Albums";
import Card from './UI/Card';
import './App.css'

function App() {
  const [albums, setAlbums] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [fetchShow, setFetchShow] = useState(false);
  const [fetched, setFetched] = useState(false);

  async function fetchAlbumsHandler() {
    setFetchShow(true)
    setFetched(true)
    let response = await fetch(`https://jsonplaceholder.typicode.com/albums`);
    let data = await response.json();
    setAlbums(data);
    setFetchShow(false)
  }

  const addAlbumHandler = async (id, title) => {
    setAddShow(true);
    await fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        title: title,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8', },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setAlbums((albums) => [...albums, data]);
      })
    setAddShow(false)
    console.log(id, title);
  };
  console.log(albums);

  const updateAlbumHandler = async (id, title) => {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: title,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    setAlbums(
      albums.filter((album) => {
        if (album.id == id) {
          album.title = title;
        }
      })
    )
  }

  async function deleteAlbumHandler(id) {
    setDeleteShow(true)
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    });
    setAlbums(
      albums.filter((album) => {
        return album.id !== id
      })
    )
    console.log(id);
    console.log(albums);
    setDeleteShow(false);
  }


  return (
    <div>
      {!fetched ?
        <Card>
          <button className="fetchBtn" onClick={fetchAlbumsHandler}>Fetch albums</button>
        </Card>
        : <Card>
          <AddAlbum albums={albums} addAlbum={addAlbumHandler} ></AddAlbum>
        </Card>
      }
      {fetchShow && <h1>Fetching albums...</h1>}
      {deleteShow && <h1>Deleting an album...</h1>}
      {addShow && <h1>Album added Successfully below....</h1>}
      <Albums albums={albums} updateAlbum={updateAlbumHandler} deleteAlbum={deleteAlbumHandler} />
    </div>
  );
}

export default App;
