import React from 'react'

export default function AddAlbum(props) {

    const id = props.albums.length + 1;

    const addNewAlbumHandler = (e) => {
        e.preventDefault();
        if (e.target.title.value == "") {
            return;
        }
        props.addAlbum(id, e.target.title.value);
        console.log(id,e.target.title.value);
        e.target.title.value = "";
    }

    return (
        <form onSubmit={addNewAlbumHandler}>
            <input name='title' placeholder='Enter album title'></input>
            <button>Add Album</button>
        </form>
    )
}
