import { useState } from "react";
import AddAlbum from "./components/AddAlbum";
import Albums from "./components/Albums";
import Card from './UI/Card';
import './App.css'

function App() {
  // this state stores the ablums details
  const [albums, setAlbums] = useState([]);
  // these states are basically used to show buttons texts
  const [deleteShow, setDeleteShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [fetchShow, setFetchShow] = useState(false);
  const [fetched, setFetched] = useState(false);

  // the function to fetch the deatails of album from the api url
  async function fetchAlbumsHandler() {
    setFetchShow(true)
    setFetched(true)
    let response = await fetch(`https://jsonplaceholder.typicode.com/albums`);
    let data = await response.json();
    setAlbums(data);
    setFetchShow(false)
  }

  // this is a dummy api call to add the new album bt it ges added to the state
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
      // here it updates to the state
      .then((data) => {
        setAlbums((albums) => [...albums, data]);
      })
    setAddShow(false)
    console.log(id, title);
  };

  // this is a dummy api call to update the album and it show toe results 
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
  }

  // this is a dummy api call to delete the album but it ges deleted in the state
  async function deleteAlbumHandler(id) {
    setDeleteShow(true)
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    });
    // here it filters and keep out the album id which is match and rest is shown
    setAlbums(
      albums.filter((album) => {
        return album.id !== id
      })
    )
    setDeleteShow(false);
  }


  return (
    <div>
      {/* it willl only show till the api is fetched */}
      {!fetched &&
        <Card>
          <button className="fetchBtn" onClick={fetchAlbumsHandler}>Fetch albums</button>
        </Card>
      }
      {/* once fetched the add new album will be showed */}
      {fetched &&
        <Card>
          <AddAlbum albums={albums} addAlbum={addAlbumHandler} ></AddAlbum>
        </Card>
      }
      {/* these shows  */}
      {fetchShow && <h1>Fetching albums...</h1>}
      {deleteShow && <h1>Deleting an album...</h1>}
      {addShow && <h1>Album added Successfully below....</h1>}
      <Albums albums={albums} updateAlbum={updateAlbumHandler} deleteAlbum={deleteAlbumHandler} />

    </div>
  );
}

export default App;
