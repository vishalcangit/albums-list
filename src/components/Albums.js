import React, { useState } from 'react'
import Card from '../UI/Card';
import './Albums.css'
import Update from './Update'

export default function Albums(props) {
    const [updateBtnClicked, setUpdateBtnClicked] = useState(false);

    const [id, setId] = useState();
    // this calls up when update button is cliked
    const updateBtnHandler = (id) => {
        setUpdateBtnClicked(true)
        console.log(id);
        setId(id);
        props.updateAlbum(id);
    }
    // this calls up when delete button is cliked
    const deleteBtnHandler = (id) => {
        console.log(id);
        props.deleteAlbum(id)
    }

    // this fn helps to show the status of the updates
    const btnClicked = (result) => {
        if (result) {
        setUpdateBtnClicked(true)
        }
        setTimeout(() => {
            setUpdateBtnClicked(false)
        }, 2000);
    }

    return (
        <div className='body'>
            {/* this will show at top when update btn is selected */}
            {updateBtnClicked && <Card>
                <Update albumId={id} album={props.albums} btnClicked={btnClicked}></Update>
            </Card>}
            {/* this maps and shows the ambuls one by one  */}
            <ul className='box'>
                {props.albums.map(album => (
                    <li className='list' key={album.id}>
                        <p className='title'><u>Album title</u>: <b>{album.title}</b></p>
                        <button className='button' onClick={() => updateBtnHandler(album.id)}>Update</button>
                        <button className='button' onClick={() => deleteBtnHandler(album.id)}>Delete</button>
                    </li>
                ))}

            </ul>
        </div>
    )
}   