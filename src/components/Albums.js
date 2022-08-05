import React, { useState } from 'react'
import './Albums.css'
import Update from './Update'

export default function Albums(props) {
    const [updateBtnClicked, setUpdateBtnClicked] = useState(false);

    const updateBtnHandler = (id) => {
        setUpdateBtnClicked(true)
        console.log(id);
        // setUpdateBtnClicked(false)
    }
    const deleteBtnHandler = (id) => {
        console.log(id);
        props.deleteAlbum(id)
    }

    return (
        <div className='body'>
            <ul className='box'>
                {props.albums.map(album => (
                    <li className='list' key={album.id}>
                        {updateBtnClicked && <Update update></Update>}
                        <p><u>Album title</u>: <b>{album.title}</b></p>
                        <button className='button' onClick={() => updateBtnHandler(album.id)}>UPDATE</button>
                        <button className='button' onClick={() => deleteBtnHandler(album.id)}>Delete</button>
                    </li>
                ))}

            </ul>
        </div>
    )
}   