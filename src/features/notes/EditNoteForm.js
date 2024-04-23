import React, {useState} from 'react';
import "./Notes.scss";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { editNote, getAllNotes } from './noteSlice';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';

const EditNoteForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector(getAllNotes);
  let tempNote = notes.filter(note => note.noteId === id);

  const [formData, setFormData] = useState(tempNote[0]);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [canSave, setCanSave] = useState(true);

  const onFormDataChange = (event) => {
    event.preventDefault();
    if(event.target.name === 'noteTitle'){
      if(event.target.value.length === 0){
        setTitleError(true);
      } else {
        setTitleError(false);
        setCanSave(true);
      }
    }

    if(event.target.name === 'noteContent'){
      if(event.target.value.length === 0){
        setContentError(true);
      } else {
        setContentError(false);
        setCanSave(true);
      }
    }

    setFormData(prevData => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    })
  }

  const onSaveNoteClicked = () => {
    if(!titleError && !contentError){
      console.log(formData);
      dispatch(editNote(formData));
      toast("Note edited successfully");
      setFormData({noteTitle: "", noteContent: ""});
    }
  }

  return (
    <div>
      <section className='note-form-section'>
        <h2 className='my-4 fs-16'>Add New Note</h2>
        <form className='note-form'>
          <div className='form-element'>
            <label htmlFor='noteTitle' className='form-label'>Title:</label>
            <input type = "text" id = "noteTitle" name = "noteTitle" placeholder='Note title here ...' onChange={onFormDataChange} className = "form-control" value = {formData.noteTitle} />
            <span className='form-error-text'>{titleError ? "Title can't be empty!" : ""}</span>
          </div>

          <div className='form-element'>
            <label htmlFor='noteContent' className='form-label'>Content:</label>
            <textarea id = "noteContent" name = "noteContent" placeholder='Note content here ...' onChange={onFormDataChange} className = "form-control" rows = "10" value = {formData.noteContent}></textarea>
            <span className='form-error-text'>{contentError ? "Content can't be empty!" : ""}</span>
          </div>

          <button type = "button" onClick={(onSaveNoteClicked)} className = "btn btn-default" disabled = {!canSave}>Save Note</button>
          <ToastContainer />
        </form>
      </section>
    </div>
  )
}

export default EditNoteForm

// import React, { useState } from 'react';
// import "./Notes.scss";
// import { useParams } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { editNote, getAllNotes, pinNote } from './noteSlice'; // Import pinNote action
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';

// const EditNoteForm = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const notes = useSelector(getAllNotes);
//   let tempNote = notes.filter(note => note.noteId === id);

//   const [formData, setFormData] = useState(tempNote[0]);
//   const [titleError, setTitleError] = useState(false);
//   const [contentError, setContentError] = useState(false);
//   const [canSave, setCanSave] = useState(true);

//   const onFormDataChange = (event) => {
//     event.preventDefault();
//     if (event.target.name === 'noteTitle') {
//       if (event.target.value.length === 0) {
//         setTitleError(true);
//       } else {
//         setTitleError(false);
//         setCanSave(true);
//       }
//     }

//     if (event.target.name === 'noteContent') {
//       if (event.target.value.length === 0) {
//         setContentError(true);
//       } else {
//         setContentError(false);
//         setCanSave(true);
//       }
//     }

//     setFormData(prevData => {
//       return {
//         ...prevData,
//         [event.target.name]: event.target.value
//       }
//     })
//   }

//   const onSaveNoteClicked = () => {
//     if (!titleError && !contentError) {
//       console.log(formData);
//       dispatch(editNote(formData));
//       toast("Note edited successfully");
//       setFormData({ noteTitle: "", noteContent: "" });
//     }
//   }

//   const onPinNoteClicked = () => {
//     dispatch(pinNote(formData.noteId));
//     toast("Note pinned successfully");
//   }

//   return (
//     <div>
//       <section className='note-form-section'>
//         <h2 className='my-4 fs-16'>Edit Note</h2>
//         <form className='note-form'>
//           <div className='form-element'>
//             <label htmlFor='noteTitle' className='form-label'>Title:</label>
//             <input type="text" id="noteTitle" name="noteTitle" placeholder='Note title here ...' onChange={onFormDataChange} className="form-control" value={formData.noteTitle} />
//             <span className='form-error-text'>{titleError ? "Title can't be empty!" : ""}</span>
//           </div>

//           <div className='form-element'>
//             <label htmlFor='noteContent' className='form-label'>Content:</label>
//             <textarea id="noteContent" name="noteContent" placeholder='Note content here ...' onChange={onFormDataChange} className="form-control" rows="10" value={formData.noteContent}></textarea>
//             <span className='form-error-text'>{contentError ? "Content can't be empty!" : ""}</span>
//           </div>

//           <button type="button" onClick={onSaveNoteClicked} className="btn btn-default" disabled={!canSave}>Save Note</button>

//           {/* Add a button to pin/unpin the note */}
//           <button type="button" onClick={onPinNoteClicked} className="btn btn-default">Pin Note</button>

//           <ToastContainer />
//         </form>
//       </section>
//     </div>
//   )
// }

// export default EditNoteForm;
