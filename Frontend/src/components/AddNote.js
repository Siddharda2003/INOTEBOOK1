import React, { useContext, useState } from 'react';
import noteContext from '../contexts/notes/noteContext';
import { useLocation } from 'react-router-dom';

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const location = useLocation();
  const user = location.state?.user; // Fetch user details from location state

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div style={{color:(props.mode==='light')?'black':'white'}} className="container my-3">
        <h2>Hello {user?.name || ''} Ready to add a new note?</h2>
        <form className="my-3">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              required
              minLength={5}
              onChange={onChange}
              value={note.title}
              aria-describedby="titleHelp"
            />
            <small id="titleHelp" className="form-text text-muted">
              <p style={{color:(props.mode==='light')?'black':'white'}}>Minimum length is 5 characters.</p>
            </small>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              required
              minLength={5}
              onChange={onChange}
              value={note.description}
              aria-describedby="descriptionHelp"
            />
            <small id="descriptionHelp" className="form-text text-muted">
            <p style={{color:(props.mode==='light')?'black':'white'}}>Minimum length is 5 characters.</p>
            </small>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <div className="col-md-6 mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button
            type="submit"
            disabled={note.title.length < 5 || note.description.length < 5}
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
