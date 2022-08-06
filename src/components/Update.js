import React, { useState } from 'react'
import './Update.css'

export default function Update(props) {
  const [title, setTitle] = useState(props.album[props.albumId - 1].title);
  const [showUpdated, setShowUpdated] = useState(false);
  // this will update the state in every keystroke in input
  const updateTitleInput = (e) => {
    setTitle(e.target.value);
  }

  // this save fn will send the props to top component
  const saveBtnClicked = (e) => {
    setShowUpdated(true)
    e.preventDefault();
    props.btnClicked(false);
  }


  return (
    <form>
      {/* this will show the updted title */}
      {showUpdated && <h1>Title updated successfully to {title}</h1>}
      {/* this will show thw update form in update btn click */}
      {!showUpdated && <div className='flex'>
        <h3>Update Album title</h3>
        <input name='updates' onChange={updateTitleInput} value={title}></input>
        <button className='btn' onClick={saveBtnClicked}>Save</button>
      </div>}
    </form>
  )
}
