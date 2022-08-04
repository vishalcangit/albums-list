import React from 'react'

export default function Albums(props) {

    const editBtnHandler = (id) => {
        console.log(id);
    }
    const deleteBtnHandler = (id) => {
        console.log(id);
        props.deleteAlbum(id)
    }


    return (
        <div>
            <ul>
                {props.albums.map(album => (
                    <li key={album.id}>
                        <p>{album.id}</p>
                        <p>{album.title}</p>
                        <button onClick={() => editBtnHandler(album.id)}>Edit</button>
                        <button onClick={() => deleteBtnHandler(album.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}   