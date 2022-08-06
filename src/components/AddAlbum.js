import React, { useState } from 'react'
import './AddAlbum.css'

export default function AddAlbum(props) {
    const [titleInvalid, setTitleInvalid] = useState(false);
    const id = props.albums.length + 1;

    // this add new fn sends the data to top component App.js
    const addNewAlbumHandler = (e) => {
        e.preventDefault();
        if (e.target.title.value === "") {
            setTitleInvalid(true);
            return;
        }
        setTitleInvalid(false);
        props.addAlbum(id, e.target.title.value);
        console.log(id, e.target.title.value);
        e.target.title.value = "";
    }
    // this will show red input if empty input submit/add is clicked
    let inputClass = !titleInvalid ? "inputTitle": "inputTitleInvalid";

    return (
        // this is the add new album form
        <form onSubmit={addNewAlbumHandler}>
            <h3>Add New Album</h3>
            <input className={inputClass} name='title' placeholder='Enter album title'></input>
            <button className='addAlbumBtn'>Add Album</button>
        </form>
    )
}
